(() => {

    angular.module('chaffers').factory('CheckContext', CheckContextFactory);

    CheckContextFactory.$inject = [
        'ChaffersModel',
        'extend'
    ];

    function CheckContextFactory(ChaffersModel,
                                 extend) {

        function CheckContext() {
            this.callSuper('constructor');
        }

        extend(CheckContext, ChaffersModel);

        // Relations

        // Django Fields
        CheckContext.createDjangoField('description');
        CheckContext.createDjangoField('displayName');
        CheckContext.createDjangoField('parent');

        // Functions
        CheckContext.prototype.getID = getID;

        return CheckContext;
        // STOP! Functions only past this point alright.

        /**
         * Returns the ID of this check context
         * @returns {*}
         */
        function getID() {
            return this.id;
        }

    }

})();