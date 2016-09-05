TextBlockFactory.$inject = ['ChaffersModel'];
export default TextBlockFactory;

function TextBlockFactory(
    ChaffersModel,
) {
    return class TextBlock extends ChaffersModel {
        static getDjangoModelName() {return 'TextBlock';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'formattedText'
            ];
        }

        /**
         * Returns the formatted version of the text for the block
         * @returns {undefined|*}
         */
        getText() {
            return this.formattedText;
        }
    }
}
