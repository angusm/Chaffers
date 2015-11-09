(function() {
    angular.module('chaffers').factory('CharacterTrait', [
        'BaseModel',
        'extend',
        characterTraitFactory
    ]);

    function characterTraitFactory(BaseModel, extend) {

        /**
         * Class to contain Character Trait data and functionality
         * @constructor
         */
        function CharacterTrait() {
            BaseModel.apply(this, arguments);
        }

        // Inherit from the Base Model since this is a backend model
        extend(CharacterTrait, BaseModel);

        // Class Functions

        // Instance Properties
        CharacterTrait.prototype.displayName = undefined;
        CharacterTrait.prototype.description = undefined;
        CharacterTrait.prototype.attributeModifiers = undefined;
        CharacterTrait.prototype.abilityModifiers = undefined;

        // Instance Functions
        CharacterTrait.prototype.getNameForDisplay = getNameForDisplay;
        CharacterTrait.prototype.getDescription = getDescription;
        CharacterTrait.prototype.getAbilityModifiers = getAbilityModifiers;
        CharacterTrait.prototype.getAttributeModifiers = getAttributeModifiers;

        return CharacterTrait;

        // STOP! Nothing but functions past this point please :)

        /**
         * Returns the display name for the character trait
         */
        function getNameForDisplay() {
            return this.displayName;
        }

        /**
         * Returns the description for the character trait
         */
        function getDescription() {
            return this.description;
        }

        /**
         * Returns the ability modifiers for the character trait
         */
        function getAbilityModifiers() {
            return this.abilityModifiers;
        }

        /**
         * Returns the attribute modifiers for the character trait
         */
        function getAttributeModifiers() {
            return this.attributeModifiers;
        }

    }

})();
