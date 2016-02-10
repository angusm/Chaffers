(function() {

    angular.module('chaffers').factory('AbilityModifier', [
        'BaseModel',
        'extend',
        AbilityModifierFactory
    ]);

    function AbilityModifierFactory(
        BaseModel,
        extend
    ) {

        function AbilityModifier() {

            this.displayName = undefined;
            this.modifier = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(AbilityModifier, BaseModel);

        AbilityModifier.prototype.getModifier = getModifier;
        AbilityModifier.prototype.getDisplayName = getDisplayName;

        return AbilityModifier;
        // STOP! Functions only past this point alright.

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
