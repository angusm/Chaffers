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
        AttributeModifier.prototype.appliesToAttribute = appliesToAttribute;

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

        /**
         * Return true if this attribute modifier applies to the
         * given attribute.
         * @param attribute
         * @returns {boolean}
         */
        function appliesToAttribute(attribute) {

            // Return true if the attribute ID property matches
            if (this.attributeId == attribute.id) {
                return true;
            }

            // Return true if there is an attribute value and its
            // ID property matches
            if (this.attribute && this.attribute.id == attribute.id) {
                return true;
            }

            // No other way this could match
            return false;
        }

    }

})();
