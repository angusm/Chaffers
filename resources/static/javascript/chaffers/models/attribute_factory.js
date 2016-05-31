(function() {

    angular.module('chaffers').factory('Attribute', AttributeFactory);

    AttributeFactory.$inject = [
        'ChaffersModel',
        'extend',
        'TextBlock',
        'relationManager',
        'createDjangoField'
    ];

    function AttributeFactory(
        ChaffersModel,
        extend,
        TextBlock,
        relationManager,
        createDjangoField
    ) {

        function Attribute() {
            ChaffersModel.apply(this);

            createDjangoField(this, 'baseValue');
            createDjangoField(this, 'displayName');
            createDjangoField(this, 'description');
        }
        extend(Attribute, ChaffersModel);

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
