TextBlockFactory.$inject = ['ChaffersModel'];
export default TextBlockFactory;

function TextBlockFactory(
    ChaffersModel,
) {
    return class TextBlock extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createCharField('formattedText');
        }
        static getModelName() {return 'TextBlock';}

        /**
         * Returns the formatted version of the text for the block
         * @returns {undefined|*}
         */
        getText() {
            return this.formattedText;
        }
    }
}
