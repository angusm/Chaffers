import isDef from '../handies/functions/is_def';
import FieldType from './field_type';
import FieldTypeDefaultValue from './field_type_default_value';
import CaseTransform from './case_transform'

const RETRY_TIME = 10000;

export default class Field {
    constructor(name, type, instance, relationClassModule = undefined, relationClassName = undefined) {
        this.instance_ = undefined;
        this.relationClassModule_ = relationClassModule;
        this.relationClassName_ = relationClassName;
        this.instance = instance;
        this.name = name;
        this.type = type;
        this.value_ = undefined;
        this.loaded_ = false;
        this.lastRequestTime_ = 0;
        this.socket_ = undefined;
        this.defaultValue_ = undefined;

        Object.defineProperty(
            instance,
            this.name, {
                get: this.getValue.bind(this),
                set: this.setValue.bind(this),
            },
        );
    }

    get instance() {
        return this.instance_;
    }

    set instance(newInstance) {
        if (this.instance_ != newInstance) {
            this.instance_ = newInstance;
            this.makeLimitedGetRequest_();
        }
    }

    getValue() {
        if (this.loaded_) {
            return this.value_;
        } else {
            this.makeLimitedGetRequest_();
            return this.getDefaultValue();
        }
    }

    getDefaultValue() {
        if (!isDef(this.defaultValue_)) {
            if (this.type === FieldType.HAS_ONE) {
                const RelationClass = this.getRelationClass();
                return new RelationClass();
            } else {
                this.defaultValue_ = FieldTypeDefaultValue[this.type];
            }
        }
        return this.defaultValue_;
    }

    getRelationClass() {
        return angular.injector([this.relationClassModule_])
            .get(this.relationClassName_);
    }

    setValue(newValue) {
        this.value_ = newValue;
        this.loaded_ = true;
        this.makeLimitedSetRequest_();
    }

    makeLimitedGetRequest_() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastRequestTime_ > RETRY_TIME &&
            isDef(this.instance.id)
        ) {
            this.lastRequestTime_ = currentTime;
            this.makeRequest_();
        }
    }

    makeLimitedSetRequest_() {

    }

    makeRequest_() {
        this.closeExistingSocket_();
        this.socket_ = new WebSocket('ws://' + window.location.host);
        this.socket_.onmessage = this.handleSocketMessage_.bind(this);
        this.socket_.onopen = this.sendSocketRequest_.bind(this);
        if (this.socket_.readyState == WebSocket.OPEN) {
            this.socket_.onopen();
        }
    }

    isHasOneRelation() {
        return this.type === FieldType.HAS_ONE;
    }

    isHasManyRelation() {
        return this.type === FieldType.HAS_MANY;
    }

    handleSocketMessage_(message) {
        const messageData = JSON.parse(message.data);
        let value;
        if (this.isHasOneRelation()) {
            const RelationClass = this.getRelationClass();
            if (messageData && messageData.id) {
                value = new RelationClass(messageData.id);
            } else {
                value = null;
            }
        } else if (this.isHasManyRelation()) {
            value = this.getRelationClass().createInstancesWithIDs(
                messageData.map((data) => data.id));
        } else {
            value = messageData;
        }
        this.instance[this.name] = value;
    }

    sendSocketRequest_() {
        this.socket_.send(JSON.stringify({
            request: 'GET',
            model_name: this.instance.constructor.getModelName(),
            id: this.instance.id,
            name: CaseTransform.camelCaseToSnakeCase(this.name),
        }));
    }

    closeExistingSocket_() {
        if (isDef(this.socket_)) {
            this.socket_.close();
        }
    }
}