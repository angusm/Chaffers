CharacterFactory.$inject = [
    'Specialty',
    'Flaw',
    'ChaffersModel',
    'TextBlock',
];
export default CharacterFactory;

function CharacterFactory(
    Specialty,
    Flaw,
    ChaffersModel,
    TextBlock
) {
    return class Character extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasManyField('flaws', 'chaffers', 'Flaw');
            this.createHasManyField('specialties', 'chaffers', 'Specialty');
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createCharField('displayName');
        }

        static getModelName() {return 'Character';}

        /**
         * Return the display name for this character
         * @returns {undefined|*}
         */
        getDisplayName() {
            return this.displayName;
        }

        /**
         * Return a link to the character's sheet
         * @returns {string}
         */
        getCharacterSheetURL() {
            return '/characters/view/' + this.id;
        }

        /**
         * Return the description for the character
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
         * Return the character's flaws
         * @returns {undefined|*}
         */
        getFlaws() {
            return this.flaws;
        }

        /**
         * Return the character's specialties
         * @returns {undefined|*}
         */
        getSpecialties() {
            return this.specialties;
        }

        /**
         * Return all of the ability modifiers for the character's specialties
         * @returns {Specialty[]}
         */
        getAllSpecialtyAbilityModifiers() {
            var modifiers = [];
            this.getSpecialties().forEach(function (specialty) {
                modifiers = modifiers.concat(specialty.getAbilityModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the ability modifiers for the character's flaws
         * @returns {Flaw[]}
         */
        getAllFlawAbilityModifiers() {
            var modifiers = [];
            this.getFlaws().forEach(function (flaw) {
                modifiers = modifiers.concat(flaw.getAbilityModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the ability modifiers for the character from
         * both its flaws and specialties
         */
        getAllAbilityModifiers() {
            return this.getAllSpecialtyAbilityModifiers().concat(
                this.getAllFlawAbilityModifiers()
            );
        }

        /**
         * Return all the ability modifiers for the given ability
         * @param ability
         * @returns {*}
         */
        getAllAbilityModifiersForAbility(ability) {
            return this.getAllAbilityModifiers().filter(function (candidateModifier) {
                return candidateModifier.appliesToAbility(ability);
            });
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * from their specialties
         * @returns {AttributeModifier[]}
         */
        getAllSpecialtyAttributeModifiers() {
            var modifiers = [];
            this.getSpecialties().forEach(function (specialty) {
                modifiers = modifiers.concat(specialty.getAttributeModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * from their flaws
         * @returns {AttributeModifier[]}
         */
        getAllFlawAttributeModifiers() {
            var modifiers = [];
            this.getFlaws().forEach(function (flaw) {
                modifiers = modifiers.concat(flaw.getAttributeModifiers());
            });
            return modifiers;
        }

        /**
         * Return all of the attribute modifiers that apply to this character
         * @returns {AttributeModifier[]}
         */
        getAllAttributeModifiers() {
            return this.getAllSpecialtyAttributeModifiers().concat(
                this.getAllFlawAttributeModifiers()
            );
        }

        getAllAttributeModifiersForAttribute(attribute) {
            return this.getAllAttributeModifiers().filter(function (candidateAttributeModifier) {
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
        getFinalAbilityModifier(ability, checkContexts) {
            var finalModifier = 0;
            this.getAllAbilityModifiersForAbility(ability).filter(function (abilityModifier) {
                return abilityModifier.isContainedInCheckContexts(checkContexts);
            }).forEach(function (abilityModifier) {
                finalModifier += abilityModifier.modifier;
            });
            return finalModifier;
        }

        /**
         * Return the final value for the given attribute
         * @param attribute {Attribute}
         * @returns {number}
         */
        getModifiedAttributeValue(attribute) {
            var finalValue = attribute.getBaseValue();
            this.getAllAttributeModifiersForAttribute(attribute).forEach(function (attributeModifier) {
                finalValue += attributeModifier.modifier;
            });
            return finalValue
        }
    }
}

