(function() {

    angular.module('chaffers').factory('AbilityModifier', [
        'BaseModel',
        'extend',
        'Ability',
        'relationManager',
        AbilityModifierFactory
    ]);

    function AbilityModifierFactory(
        BaseModel,
        extend,
        Ability,
        relationManager
    ) {

        function AbilityModifier() {

            this.id = undefined;

            this.ability = undefined;
            this.abilityId = undefined;

            this.displayName = undefined;
            this.modifier = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(AbilityModifier, BaseModel);

        // Relations
        relationManager.registerHasOneRelation(AbilityModifier, 'ability', Ability);

        // Functions
        AbilityModifier.prototype.getModifier = getModifier;
        AbilityModifier.prototype.getDisplayName = getDisplayName;
        AbilityModifier.prototype.appliesToAbility = appliesToAbility;

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

    }

})();
