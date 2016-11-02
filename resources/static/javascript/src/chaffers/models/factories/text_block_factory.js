TextBlockFactory.$inject = ['ChaffersModel'];
let TextBlock;
export default TextBlockFactory;

function TextBlockFactory(
    ChaffersModel,
) {
    TextBlock = TextBlock || class TextBlock extends ChaffersModel {
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
    };
    return TextBlock;
}
