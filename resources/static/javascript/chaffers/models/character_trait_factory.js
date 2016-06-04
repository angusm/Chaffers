(function() {
    angular.module('chaffers').factory('CharacterTrait', [
        'ChaffersModel',
        'extend',
        'relationManager',
        'TextBlock',
        'AttributeModifier',
        'AbilityModifier',
        'createDjangoField',
        characterTraitFactory
    ]);

    function characterTraitFactory(
        ChaffersModel,
        extend,
        relationManager,
        TextBlock,
        AttributeModifier,
        AbilityModifier,
        createDjangoField
    ) {

        /**
         * Class to contain Character Trait data and functionality
         * @constructor
         */
        function CharacterTrait() {
            this.callSuper('constructor');

            createDjangoField(this, 'displayName');
            createDjangoField(this, 'description');
            createDjangoField(this, 'attributeModifiers');
            createDjangoField(this, 'abilityModifiers');
        }

        // Inherit from the Base Model since this is a backend model
        extend(CharacterTrait, ChaffersModel);

        // Attach relations
        relationManager.registerHasOneRelation(CharacterTrait, 'description', TextBlock);
        relationManager.registerHasManyRelation(CharacterTrait, 'attributeModifiers', AttributeModifier);
        relationManager.registerHasManyRelation(CharacterTrait, 'abilityModifiers', AbilityModifier);

        // Instance Functions
        CharacterTrait.prototype.getDisplayName = getDisplayName;
        CharacterTrait.prototype.getDescription = getDescription;
        CharacterTrait.prototype.getAbilityModifiers = getAbilityModifiers;
        CharacterTrait.prototype.getAttributeModifiers = getAttributeModifiers;

        return CharacterTrait;

        // STOP! Nothing but functions past this point please :)

        /**
         * Returns the display name for the character trait
         */
        function getDisplayName() {
            return this.displayName;
        }

        /**
         * Returns the description for the character trait
         * @returns {*}
         */
        function getDescription() {

            // If the description is not an instance of text block return nothing
            if (typeof this.description === 'undefined') {
                return '';
            }

            return this.description.getText();
        }

        /**
         * Returns the ability modifiers for the character trait
         */
        function getAbilityModifiers() {
            if (typeof this.abilityModifiers === 'undefined') {
                return [];
            } else {
                return this.abilityModifiers;
            }
        }

        /**
         * Returns the attribute modifiers for the character trait
         */
        function getAttributeModifiers() {
            if (typeof this.attributeModifiers === 'undefined') {
                return [];
            } else {
                return this.attributeModifiers;
            }
        }

    }

})();
