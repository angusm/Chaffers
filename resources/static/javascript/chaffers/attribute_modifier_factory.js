(function() {

    angular.module('chaffers').factory('AttributeModifier', [
        'BaseModel',
        'extend',
        AttributeModifierFactory
    ]);

    function AttributeModifierFactory(
        BaseModel,
        extend
    ) {

        function AttributeModifier() {

            this.displayName = undefined;
            this.modifier = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(AttributeModifier, BaseModel);

        AttributeModifier.prototype.getModifier = getModifier;
        AttributeModifier.prototype.getDisplayName = getDisplayName;

        return AttributeModifier;
        // STOP! Functions only past this point alright.

        /**
         * Return the modifier for this instance
         * @returns {undefined|*}
         */
        function getModifier() {
            return this.modifier;
        }

        /**
         * Return the display name for the attribute modifier
         * @returns {undefined|*}
         */
        function getDisplayName() {
            return this.displayName;
        }

    }

})();
