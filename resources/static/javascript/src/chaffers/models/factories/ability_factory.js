AbilityFactory.$inject = [
    'ChaffersModel',
    'TextBlock'
];
let Ability;
export default AbilityFactory;

function AbilityFactory(
    ChaffersModel,
    TextBlock
) {
    Ability = Ability || class Ability extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createCharField('displayName');
        }

        static getModelName() {
            return 'Ability';
        }

        /**
         * Return the description of the ability
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
         * Return the display name for the ability modifier
         * @returns {string}
         */
        getDisplayName() {
            return this.displayName;
        }
    };

    return Ability;
}
