CharacterTraitFactory.$inject = [
    'ChaffersModel',
    'TextBlock',
    'AttributeModifier',
    'AbilityModifier',
];
export default CharacterTraitFactory;

function CharacterTraitFactory(
    ChaffersModel,
    TextBlock,
    AttributeModifier,
    AbilityModifier
) {

    /**
     * Class to contain Character Trait data and functionality
     * @constructor
     */
    return class CharacterTrait extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createCharField('displayName');
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createHasManyField('attributeModifiers', 'chaffers', 'AttributeModifier');
            this.createHasManyField('abilityModifiers', 'chaffers', 'AbilityModifier');
        }

        static getModelName() {return 'CharacterTrait';}

        /**
         * Returns the display name for the character trait
         */
        getDisplayName() {
            return this.displayName;
        }

        /**
         * Returns the description for the character trait
         * @returns {*}
         */
        getDescription() {

            // If the description is not an instance of text block return nothing
            if (typeof this.description === null) {
                return '';
            }

            return this.description.getText();
        }

        /**
         * Returns the ability modifiers for the character trait
         */
        getAbilityModifiers() {
            if (typeof this.abilityModifiers === 'undefined') {
                return [];
            } else {
                return this.abilityModifiers;
            }
        }

        /**
         * Returns the attribute modifiers for the character trait
         */
        getAttributeModifiers() {
            if (typeof this.attributeModifiers === 'undefined') {
                return [];
            } else {
                return this.attributeModifiers;
            }
        }
    }
}
