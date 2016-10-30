import Field from './field';
import FieldType from './field_type';

export default class BackendModel {
    constructor(id) {
        this.id = id;
        this.fields_ = new Map();
    }

    createField_(fieldName, type, relationModuleName, relationFactoryName) {
        const field = new Field(
            fieldName,
            type,
            this,
            relationModuleName,
            relationFactoryName);
        this.fields_.set(fieldName, field);
    }

    createBooleanField(fieldName) {
        this.createField_(fieldName, FieldType.BOOLEAN);
    }

    createCharField(fieldName) {
        this.createField_(fieldName, FieldType.CHAR);
    }

    createDateField(fieldName) {
        this.createField_(fieldName, FieldType.DATE);
    }

    createDateTimeField(fieldName) {
        this.createField_(fieldName, FieldType.DATE_TIME);
    }

    createNumberField(fieldName) {
        this.createField_(fieldName, FieldType.NUMBER);
    }

    createHasManyField(fieldName, relationModuleName, relationFactoryName) {
        this.createField_(fieldName, FieldType.HAS_MANY,
            relationModuleName, relationFactoryName);
    }

    createHasOneField(fieldName, relationModuleName, relationFactoryName) {
        this.createField_(fieldName, FieldType.HAS_ONE,
            relationModuleName, relationFactoryName);
    }

    static getModelName() {
        throw new Error('Must be overridden in child classes');
    }
}
