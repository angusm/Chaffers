import FieldType from './field_type';

const FieldTypeDefaultValues = {};
FieldTypeDefaultValues[FieldType.BOOLEAN] = undefined;
FieldTypeDefaultValues[FieldType.CHAR] = '';
FieldTypeDefaultValues[FieldType.DATE] = new Date(0);
FieldTypeDefaultValues[FieldType.DATE_TIME] = new Date(0);
FieldTypeDefaultValues[FieldType.NUMBER] = undefined;
FieldTypeDefaultValues[FieldType.HAS_MANY] = [];
FieldTypeDefaultValues[FieldType.HAS_ONE] = {};

export default FieldTypeDefaultValues;
