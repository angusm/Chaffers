AttributeFactory.$inject = [
    'ChaffersModel',
    'TextBlock',
];
let Attribute;
export default AttributeFactory;

function AttributeFactory(
    ChaffersModel,
    TextBlock,
) {
    Attribute = Attribute || class Attribute extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createNumberField('baseValue');
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createCharField('displayName');
        }

        static getModelName() {return 'Attribute';}

        /**
         * Return the base value for this attribute
         * @returns {Number}
         */
        getBaseValue() {
            return this.baseValue;
        }

        /**
         * Return the description of the Attribute
         * @returns {string}
         */
        getDescription() {
            if (this.description) {
                return this.description.formattedText;
            } else {
                return '';
            }
        }

        /**
         * Return the display name for the Attribute modifier
         * @returns {string}
         */
        getDisplayName() {
            return this.displayName;
        }
    };
    return Attribute;
}
