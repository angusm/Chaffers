CheckContextFactory.$inject = [
    'ChaffersModel'
];
export default CheckContextFactory;

function CheckContextFactory(ChaffersModel) {
    return class CheckContext extends ChaffersModel {
        static getDjangoModelName() {return 'CheckContext';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'description',
                'displayName',
                'parent',
            ];
        }

        /**
         * Returns the ID of this check context
         * @returns {*}
         */
        getID() {
            return this.id;
        }
    }
}
