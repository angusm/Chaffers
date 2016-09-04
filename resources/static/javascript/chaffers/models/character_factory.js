(() => {

    angular.module('chaffers').factory('Character', [
        'Specialty',
        'Flaw',
        'ChaffersModel',
        'relationManager',
        'extend',
        'TextBlock',
        CharacterFactory
    ]);

    function CharacterFactory(
        Specialty,
        Flaw,
        ChaffersModel,
        relationManager,
        extend,
        TextBlock
    ) {

        function Character() {
            this.callSuper('constructor');
        }
        extend(Character, ChaffersModel);

        // Django Fields
        Character.createDjangoField('specialties');
        Character.createDjangoField('flaws');
        Character.createDjangoField('description');
        Character.createDjangoField('displayName');

        // Functions
        Character.prototype.getDisplayName = getDisplayName;
        Character.prototype.getFlaws = getFlaws;
        Character.prototype.getSpecialties = getSpecialties;
        Character.prototype.getDescription = getDescription;
        Character.prototype.getCharacterSheetURL = getCharacterSheetURL;

        Character.prototype.getAllSpecialtyAbilityModifiers = getAllSpecialtyAbilityModifiers;
        Character.prototype.getAllFlawAbilityModifiers = getAllFlawAbilityModifiers;
        Character.prototype.getAllAbilityModifiers = getAllAbilityModifiers;
        Character.prototype.getAllAbilityModifiersForAbility = getAllAbilityModifiersForAbility;
        Character.prototype.getFinalAbilityModifier = getFinalAbilityModifier;

        Character.prototype.getAllSpecialtyAttributeModifiers = getAllSpecialtyAttributeModifiers;
        Character.prototype.getAllFlawAttributeModifiers = getAllFlawAttributeModifiers;
        Character.prototype.getAllAttributeModifiers = getAllAttributeModifiers;
        Character.prototype.getAllAttributeModifiersForAttribute = getAllAttributeModifiersForAttribute;
        Character.prototype.getModifiedAttributeValue = getModifiedAttributeValue;

        // Register Relations
        relationManager.registerHasManyRelation(Character, 'flaws', Flaw);
        relationManager.registerHasManyRelation(Character, 'specialties', Specialty);
        relationManager.registerHasOneRelation(Character, 'description', TextBlock);

        return Character;

        // STOP! Only functions past here.

        /**
         * Return the display name for this character
         * @returns {undefined|*}
         */
        function getDisplayName() {
            return this.displayName;
        }

        /**
         * Return a link to the character's sheet
         * @returns {string}
         */
        function getCharacterSheetURL() {
            return '/characters/view/' + this.id;
        }

        /**
         * Return the description for the character
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
         * Return the character's flaws
         * @returns {undefined|*}
         */
        function getFlaws() {
            return this.flaws;
        }

        /**
         * Return the character's specialties
         * @returns {undefined|*}
         */
        function getSpecialties() {
            return this.specialties;
        }

        /**
         * Return all of the ability modifiers for the character's specialties
         * @returns {Specialty[]}
         */
        function getAllSpecialtyAbilityModifiers() {
            var modifiers = [];
            this.getSpecialties().forEach(function(specialty) {
                modifiers = modifiers.concat(specialty.getAbilityModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the ability modifiers for the character's flaws
         * @returns {Flaw[]}
         */
        function getAllFlawAbilityModifiers() {
            var modifiers = [];
            this.getFlaws().forEach(function(flaw) {
                modifiers = modifiers.concat(flaw.getAbilityModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the ability modifiers for the character from
         * both its flaws and specialties
         */
        function getAllAbilityModifiers() {
            return this.getAllSpecialtyAbilityModifiers().concat(
                this.getAllFlawAbilityModifiers()
            );
        }

        /**
         * Return all the ability modifiers for the given ability
         * @param ability
         * @returns {*}
         */
        function getAllAbilityModifiersForAbility(ability) {
            return this.getAllAbilityModifiers().filter(function(candidateModifier) {
                return candidateModifier.appliesToAbility(ability);
            });
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * from their specialties
         * @returns {AttributeModifier[]}
         */
        function getAllSpecialtyAttributeModifiers() {
            var modifiers = [];
            this.getSpecialties().forEach(function(specialty) {
                modifiers = modifiers.concat(specialty.getAttributeModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * from their flaws
         * @returns {AttributeModifier[]}
         */
        function getAllFlawAttributeModifiers() {
            var modifiers = [];
            this.getFlaws().forEach(function(flaw) {
                modifiers = modifiers.concat(flaw.getAttributeModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * @returns {AttributeModifier[]}
         */
        function getAllAttributeModifiers() {
            return this.getAllSpecialtyAttributeModifiers().concat(
                this.getAllFlawAttributeModifiers()
            );
        }

        function getAllAttributeModifiersForAttribute(attribute) {
            return this.getAllAttributeModifiers().filter(function(candidateAttributeModifier) {
                return candidateAttributeModifier.appliesToAttribute(attribute);
            });
        }

        /**
         * Return the modifier for the given ability as determined
         * by tallying relevant specialties and flaws
         * @param ability
         * @param checkContexts {Array<CheckContext>} An array of applicable contexts
         * @returns {number}
         */
        function getFinalAbilityModifier(ability, checkContexts) {
            var finalModifier = 0;
            this.getAllAbilityModifiersForAbility(ability).filter(function(abilityModifier) {
                return abilityModifier.isContainedInCheckContexts(checkContexts);
            }).forEach(function(abilityModifier) {
                finalModifier += abilityModifier.modifier;
            });
            return finalModifier;
        }

        /**
         * Return the final value for the given attribute
         * @param attribute {Attribute}
         * @returns {number}
         */
        function getModifiedAttributeValue(attribute) {
            var finalValue = attribute.getBaseValue();
            this.getAllAttributeModifiersForAttribute(attribute).forEach(function(attributeModifier) {
                finalValue += attributeModifier.modifier;
            });
            return finalValue
        }


    }

})();
