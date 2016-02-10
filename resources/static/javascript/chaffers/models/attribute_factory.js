(function() {

    angular.module('chaffers').factory('Attribute', AttributeFactory);

    AttributeFactory.$inject = [
        'BaseModel',
        'extend',
        'TextBlock',
        'relationManager'
    ];

    function AttributeFactory(
        BaseModel,
        extend,
        TextBlock,
        relationManager
    ) {

        function Attribute() {

            this.id = undefined;
            this.baseValue = undefined;
            this.displayName = undefined;
            this.description = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(Attribute, BaseModel);

        // Relations
        relationManager.registerHasOneRelation(Attribute, 'description', TextBlock);

        // Functions
        Attribute.prototype.getBaseValue = getBaseValue;
        Attribute.prototype.getDisplayName = getDisplayName;
        Attribute.prototype.getDescription = getDescription;

        return Attribute;
        // STOP! Functions only past this point alright.

        /**
         * Return the base value for this attribute
         * @returns {Number}
         */
        function getBaseValue() {
            return this.baseValue;
        }

        /**
         * Return the description of the Attribute
         * @returns {string}
         */
        function getDescription() {
            return this.description.formattedText;
        }

        /**
         * Return the display name for the Attribute modifier
         * @returns {string}
         */
        function getDisplayName() {
            return this.displayName;
        }

    }

})();
