(function () {

    angular.module('chaffers').factory('CheckContext', CheckContextFactory);

    CheckContextFactory.$inject = [
        'ChaffersModel',
        'extend',
        'relationManager',
        'createDjangoField'
    ];

    function CheckContextFactory(ChaffersModel,
                                 extend,
                                 relationManager,
                                 createDjangoField) {

        function CheckContext() {
            this.callSuper('constructor');
        }

        extend(CheckContext, ChaffersModel);

        // Relations

        // Django Fields
        createDjangoField(CheckContext, 'description');
        createDjangoField(CheckContext, 'displayName');
        createDjangoField(CheckContext, 'parent');

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