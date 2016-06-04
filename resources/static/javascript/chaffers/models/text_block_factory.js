(function() {

    angular.module('chaffers').factory('TextBlock', [
        'ChaffersModel',
        'extend',
        'createDjangoField',
        TextBlockFactory
    ]);

    function TextBlockFactory(
        ChaffersModel,
        extend,
        createDjangoField
    ) {

        function TextBlock() {
            this.callSuper('constructor');
        }
        extend(TextBlock, ChaffersModel);

        // Django fields
        createDjangoField(TextBlock, 'formattedText');

        // Instance methods
        TextBlock.prototype.getText = getText;

        return TextBlock;
        // STOP! Functions only past this point.

        /**
         * Returns the formatted version of the text for the block
         * @returns {undefined|*}
         */
        function getText() {
            return this.formattedText;
        }

    }

})();
