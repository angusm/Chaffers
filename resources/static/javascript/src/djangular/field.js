import isDef from '../handies/functions/is_def';
import FieldType from './field_type';
import FieldTypeDefaultValue from './field_type_default_value';
import Socket from './socket';

const RETRY_TIME = 10000;

export default class Field {
    constructor(name, type, instance, relationClassModule = undefined, relationClassName = undefined) {
        this.instance_ = instance;
        this.relationClassModule_ = relationClassModule;
        this.relationClassName_ = relationClassName;
        this.name = name;
        this.type = type;
        this.value_ = undefined;
        this.loaded_ = false;
        this.requested_ = false;
        this.socket_ = Socket.getByClass(this.instance_.constructor);
        this.defaultValue_ = undefined;

        Object.defineProperty(
            instance,
            this.name, {
                get: this.getValue.bind(this),
                set: this.setValue.bind(this),
            },
        );
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
        console.log('set', this.instance_.constructor.getModelName(), this.instance_.id, this.name, newValue);
        this.value_ = newValue;
        this.loaded_ = true;
    }

    makeLimitedGetRequest_() {
        if (!this.requested_ && this.instance_.id) {
            this.requested_ = true;
            this.socket_.requestField(this.name, this.instance_);
        }
    }

    populateFromBackendData(backendData) {
        console.log('setting', this.instance_.constructor.getModelName(), this.instance_.id, this.name, backendData);
        this.instance_[this.name] = this.getValueFromBackendData(backendData);
    }

    getValueFromBackendData(backendData) {
        let value;
        if (this.isHasOneRelation()) {
            const RelationClass = this.getRelationClass();
            if (backendData && backendData.id) {
                value = RelationClass.getInstanceWithId(backendData.id);
            } else {
                value = null;
            }
        } else if (this.isHasManyRelation()) {
            value = this.getRelationClass().getInstancesByIds(
                backendData.map((data) => data.id));
        } else {
            value = backendData;
        }
        return value;
    }

    isHasOneRelation() {
        return this.type === FieldType.HAS_ONE;
    }

    isHasManyRelation() {
        return this.type === FieldType.HAS_MANY;
    }
}