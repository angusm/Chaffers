import CaseTransform from './case_transform';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';

const REQUEST_LIMIT = 7;
let socket;
const socketMap = new DynamicDefaultMap((ModelClass) => {
    return Socket.getSingleton();
});

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
        const messageData = parsedMessage.data;
        const modelName = parsedMessage.model_name;
        const fieldName =
            CaseTransform.snakeCaseToCamelCase(parsedMessage.field_name);
        const id = parsedMessage.id;
        const ModelClass = angular.injector(['chaffers']).get(modelName);
        const instance = ModelClass.getInstanceWithId(id);
        const field = instance.getField(fieldName);
        field.populateFromBackendData(messageData);
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
            while (this.sendQueue_.length > 0 && this.outstanding_ < REQUEST_LIMIT) {
                const request = this.sendQueue_.pop();
                this.socket_.send(request);
                this.outstanding_++;
            }
        }
    }

    requestField(fieldName, instance) {
        console.log(instance.constructor.getModelName(), fieldName, instance.id);
        this.sendQueue_.push(JSON.stringify({
            request: 'GET',
            model_name: instance.constructor.getModelName(),
            id: instance.id,
            field_name: CaseTransform.camelCaseToSnakeCase(fieldName),
        }));
        this.processSendQueue_();
    }
}

export default Socket;