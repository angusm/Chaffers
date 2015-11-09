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

        return AttributeModifier;

        // STOP! Functions only past this point.

        function AttributeModifier() {

            this.modifier = undefined;

            BaseModel.apply(this, attributes);
        }
        extend(AttributeModifier, BaseModel);

        AttributeModifier.prototype.getModifier = getModifier;

        return AttributeModifier;
        // STOP! Functions only past this point alright.

        /**
         * Return the modifier for this instance
         * @returns {undefined|*}
         */
        function getModifier() {
            return this.modifier;
        }

    }

})();
