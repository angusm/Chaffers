AbilityFactory.$inject = [
    'ChaffersModel',
    'TextBlock'
];
export default AbilityFactory;

function AbilityFactory(
    ChaffersModel,
    TextBlock
) {
    return class Ability extends ChaffersModel {
        static getDjangoModelName() {return 'Ability';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'description',
                'displayName'
            ];
        }

        static getHasOneRelations() {
            return super.getHasOneRelations().
                set('description', TextBlock);
        }

        /**
         * Return the description of the ability
         * @returns {string}
         */
        getDescription() {
            return this.description.formattedText;
        }

        /**
         * Return the display name for the ability modifier
         * @returns {string}
         */
        getDisplayName() {
            return this.displayName;
        }
    }
}
