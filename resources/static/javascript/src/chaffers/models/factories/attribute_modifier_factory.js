AttributeModifierFactory.$inject = [
    'ChaffersModel',
    'Attribute',
];
let AttributeModifier;
export default AttributeModifierFactory;

function AttributeModifierFactory(
    ChaffersModel,
    Attribute,
) {
    AttributeModifier = AttributeModifier || class AttributeModifier extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createCharField('displayName');
            this.createNumberField('modifier');
            this.createNumberField('attributeId');
            this.createHasOneField('attribute', 'chaffers', 'Attribute');
        }

        static getModelName() {return 'AttributeModifier';}

        /**
         * Return the modifier for this instance
         * @returns {undefined|*}
         */
        getModifier() {
            return this.modifier;
        }

        /**
         * Return the display name for the attribute modifier
         * @returns {undefined|*}
         */
        getDisplayName() {
            return this.displayName;
        }

        /**
         * Return true if this attribute modifier applies to the
         * given attribute.
         * @param attribute
         * @returns {boolean}
         */
        appliesToAttribute(attribute) {

            // Return true if the attribute ID property matches
            if (this.attributeId == attribute.id) {
                return true;
            }

            // Return true if there is an attribute value and its
            // ID property matches
            if (this.attribute && this.attribute.id == attribute.id) {
                return true;
            }

            // No other way this could match
            return false;
        }
    }
    return AttributeModifier;
}
