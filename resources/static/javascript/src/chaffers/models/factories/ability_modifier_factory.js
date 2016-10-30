AbilityModifierFactory.$inject = [
    'ChaffersModel',
    'Ability',
    'CheckContext',
];
export default AbilityModifierFactory;

function AbilityModifierFactory(
    ChaffersModel,
    Ability,
    CheckContext,
) {
    return class AbilityModifier extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasOneField('ability', 'chaffers', 'Ability');
            this.createNumberField('abilityId');
            this.createHasManyField('checkContexts', 'chaffers', 'CheckContext');
            this.createCharField('displayName');
            this.createNumberField('modifier');
        }

        static getModelName() {return 'AbilityModifier';}

        /**
         * Returns true if the modifier applies to the given ability
         * @param ability
         */
        appliesToAbility(ability) {

            // Check the ability ID property
            if (this.abilityId == ability.id) {
                return true;
            }

            // Check the ID property of an attached ability, if any
            if (this.ability && this.ability.id == ability.id) {
                return true;
            }

            // There's no other ways we could match, so we're done here
            return false;

        }

        /**
         * Return the modifier for this instance
         * @returns {undefined|*}
         */
        getModifier() {
            return this.modifier;
        }

        /**
         * Return the display name for the ability modifier
         * @returns {undefined|*}
         */
        getDisplayName() {
            return this.displayName;
        }

        /**
         * Return the check contexts associated with this modifier
         * @returns {string|undefined|*}
         */
        getCheckContexts() {
            return this.checkContexts;
        }

        /**
         * Return the IDs for the check contexts associated with this modifier
         * @returns {*|Array}
         */
        getCheckContextIDs() {
            return this.getCheckContexts().map(function (checkContext) {
                return checkContext.getID();
            })
        }

        /**
         * Returns true if the contexts attached to this ability modifier
         * are contained within the given set
         * @param checkContexts
         */
        isContainedInCheckContexts(checkContexts) {
            var givenCheckContextIDMap = {};
            checkContexts.forEach(function (checkContext) {
                givenCheckContextIDMap[checkContext.getID()] = true;
            });

            var modifierCheckContextIDs = this.getCheckContextIDs();

            // Loop through the modifier check context IDs looking for
            // an early return point if one is missing
            for (var modifierCheckContextIDIndex = 0; modifierCheckContextIDIndex < modifierCheckContextIDs.length; modifierCheckContextIDIndex++) {
                var modifierCheckContextID = modifierCheckContextIDs[modifierCheckContextIDIndex];
                if (!givenCheckContextIDMap[modifierCheckContextID]) {
                    return false;
                }
            }

            // We've checked that each ID is contained and can now return true
            return true;

        }
    }

}
