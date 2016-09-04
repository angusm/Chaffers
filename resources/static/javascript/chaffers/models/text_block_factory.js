(() => {

    angular.module('chaffers').factory('TextBlock', [
        'ChaffersModel',
        'extend',
        TextBlockFactory
    ]);

    function TextBlockFactory(
        ChaffersModel,
        extend
    ) {

        function TextBlock() {
            this.callSuper('constructor');
        }
        extend(TextBlock, ChaffersModel);

        // Django fields
        TextBlock.createDjangoField('formattedText');

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
