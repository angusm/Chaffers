AttributeFactory.$inject = [
    'ChaffersModel',
    'TextBlock',
];
export default AttributeFactory;

function AttributeFactory(
    ChaffersModel,
    TextBlock,
) {
    return class Attribute extends ChaffersModel {
        static getDjangoModelName() {return 'Attribute';}
        
        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'baseValue',
                'displayName',
                'description',
            ]
        }

        static getHasOneRelations() {
            return super.getHasOneRelations().set('description', TextBlock);
        }

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
            return this.description.formattedText;
        }

        /**
         * Return the display name for the Attribute modifier
         * @returns {string}
         */
        getDisplayName() {
            return this.displayName;
        }
    }

}
