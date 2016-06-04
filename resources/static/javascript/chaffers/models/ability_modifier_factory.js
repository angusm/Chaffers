(function() {

    angular.module('chaffers').factory('AbilityModifier', [
        'ChaffersModel',
        'extend',
        'Ability',
        'CheckContext',
        'relationManager',
        AbilityModifierFactory
    ]);

    function AbilityModifierFactory(
        ChaffersModel,
        extend,
        Ability,
        CheckContext,
        relationManager
    ) {

        function AbilityModifier() {
            this.callSuper('constructor');
        }
        extend(AbilityModifier, ChaffersModel);

        // Relations
        relationManager.registerHasOneRelation(AbilityModifier, 'ability', Ability);
        relationManager.registerHasManyRelation(AbilityModifier, 'checkContexts', CheckContext);

        // Django Fields
        AbilityModifier.createDjangoField('ability');
        AbilityModifier.createDjangoField('abilityId');
        AbilityModifier.createDjangoField('checkContexts');
        AbilityModifier.createDjangoField('displayName');
        AbilityModifier.createDjangoField('modifier');

        // Functions
        AbilityModifier.prototype.getModifier = getModifier;
        AbilityModifier.prototype.getDisplayName = getDisplayName;
        AbilityModifier.prototype.isContainedInCheckContexts = isContainedInCheckContexts;
        AbilityModifier.prototype.appliesToAbility = appliesToAbility;
        AbilityModifier.prototype.getCheckContexts = getCheckContexts;
        AbilityModifier.prototype.getCheckContextIDs = getCheckContextIDs;

        return AbilityModifier;
        // STOP! Functions only past this point alright.

        /**
         * Returns true if the modifier applies to the given ability
         * @param ability
         */
        function appliesToAbility(ability) {

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
        function getModifier() {
            return this.modifier;
        }

        /**
         * Return the display name for the ability modifier
         * @returns {undefined|*}
         */
        function getDisplayName() {
            return this.displayName;
        }

        /**
         * Return the check contexts associated with this modifier
         * @returns {string|undefined|*}
         */
        function getCheckContexts() {
            return this.checkContexts;
        }

        /**
         * Return the IDs for the check contexts associated with this modifier
         * @returns {*|Array}
         */
        function getCheckContextIDs() {
            return this.getCheckContexts().map(function(checkContext) {
                return checkContext.getID();
            })
        }

        /**
         * Returns true if the contexts attached to this ability modifier
         * are contained within the given set
         * @param checkContexts
         */
        function isContainedInCheckContexts(checkContexts) {
            var givenCheckContextIDMap = {};
            checkContexts.forEach(function(checkContext) {
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

})();
