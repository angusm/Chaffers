CheckContextFactory.$inject = [
    'ChaffersModel',
    'TextBlock',
];
let CheckContext;
export default CheckContextFactory;

function CheckContextFactory(
    ChaffersModel,
    TextBlock
) {
    CheckContext = CheckContext || class CheckContext extends ChaffersModel {

        constructor(id) {
            super(id);
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createCharField('displayName');
            this.createHasOneField('parent', 'chaffers', 'CheckContext');
        }

        static getModelName() {return 'CheckContext';}

        /**
         * Returns the ID of this check context
         * @returns {*}
         */
        getID() {
            return this.id;
        }
    };
    return CheckContext;
}
