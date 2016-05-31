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
            ChaffersModel.apply(this);

            createDjangoField(this, 'description');
            createDjangoField(this, 'displayName');
            createDjangoField(this, 'parent');
        }

        extend(CheckContext, ChaffersModel);

        // Relations

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