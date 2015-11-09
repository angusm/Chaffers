(function() {

    angular.module('chaffers').factory('TextBlock', [
        'BaseModel',
        'extend',
        TextBlockFactory
    ]);

    function TextBlockFactory(BaseModel, extend) {

        function TextBlock() {
            this.formattedText = undefined;
        }
        extend(TextBlock, BaseModel);

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
