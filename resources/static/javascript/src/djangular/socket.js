import CaseTransform from './case_transform';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';
import ArrayMap from '../handies/structs/maps/array';
import populateInstance from './populate_instance';

const REQUEST_LIMIT = 7;
let socket;
const socketMap = new DynamicDefaultMap((ModelClass) => {
    return Socket.getSingleton();
});

let timeout;
const modelNames = [];
const fieldsByClass = new ArrayMap();
const idsByClass = new ArrayMap();

class Socket {
    constructor() {
        this.sendQueue_ = [];
        this.socket_;
        this.openSocket_();
        this.outstanding_ = 0;
    }

    static getSingleton() {
        this.singleton_ = this.singleton_ || new Socket();
        return this.singleton_;
    }

    openSocket_() {
        if (!this.isReady_() && !this.isConnecting_()) {
            this.socket_ = new WebSocket('ws://' + window.location.host);
            this.socket_.startTime = new Date().getTime();
            this.socket_.onmessage = this.handleSocketMessage_.bind(this);
            this.socket_.onopen = () => {
                this.processSendQueue_();
            };
        }
    }

    static getByClass(ModelClass) {
        return socketMap.get(ModelClass);
    }

    handleSocketMessage_(message) {
        const parsedMessage = JSON.parse(message.data);
        const messageData = parsedMessage.values;
        const modelName = parsedMessage.model_name;
        const ModelClass = angular.injector(['chaffers']).get(modelName);

        messageData.forEach((instanceData) => {
            const id = instanceData.id;
            const instance = ModelClass.getInstanceWithId(id);
            populateInstance(instance, instanceData);
        });
        angular.element('body').scope().$digest();
        this.outstanding_--;
        this.processSendQueue_();
    }

    isReady_() {
        return this.socket_ && this.socket_.readyState === WebSocket.OPEN;
    }

    isConnecting_() {
        return this.socket_ &&
            new Date().getTime() - this.socket_.startTime < 1000 &&
            this.socket_.readyState === WebSocket.CONNECTING;
    }

    processSendQueue_() {
        if (!this.isReady_()) {
            this.openSocket_();
        } else {
            modelNames.filter((modelName, i) => {
                return modelNames.indexOf(modelName) === i;
            }).forEach((modelName) => {
                if (this.outstanding_ >= REQUEST_LIMIT) {
                    return;
                }

                const ids = idsByClass.get(modelName).filter((val, i, a) => {
                    return a.indexOf(val) === i;
                });
                const fields = fieldsByClass.get(modelName).filter((val, i, a) => {
                    return a.indexOf(val) === i;
                });

                this.socket_.send(JSON.stringify({
                    request: 'GET',
                    model_name: modelName,
                    ids: ids,
                    field_names: ['id', ...fields.map((fieldName) => {
                        return CaseTransform.camelCaseToSnakeCase(fieldName)
                    })],
                }));
                fieldsByClass.delete(modelName);
                idsByClass.delete(modelName);
                this.outstanding_++;
                modelNames.splice(modelName.indexOf(modelName), 1);
            });
        }
    }

    requestField(fieldName, instance) {
        const modelName = instance.constructor.getModelName();
        modelNames.push(modelName);
        fieldsByClass.pushOnArray(modelName, fieldName);
        idsByClass.pushOnArray(modelName, instance.id);

        clearTimeout(timeout);
        setTimeout(() => {
            this.processSendQueue_();
        }, 1);
        this.processSendQueue_();
    }
}

export default Socket;