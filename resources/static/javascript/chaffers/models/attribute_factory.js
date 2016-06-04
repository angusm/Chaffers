(function() {

    angular.module('chaffers').factory('Attribute', AttributeFactory);

    AttributeFactory.$inject = [
        'ChaffersModel',
        'extend',
        'TextBlock',
        'relationManager'
    ];

    function AttributeFactory(
        ChaffersModel,
        extend,
        TextBlock,
        relationManager
    ) {

        function Attribute() {
            this.callSuper('constructor');
        }
        extend(Attribute, ChaffersModel);

        // Relations
        relationManager.registerHasOneRelation(Attribute, 'description', TextBlock);

        // Django Fields
        Attribute.createDjangoField('baseValue');
        Attribute.createDjangoField('displayName');
        Attribute.createDjangoField('description');

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
