(function () {

    angular.module('chaffers').factory('CheckContext', CheckContextFactory);

    CheckContextFactory.$inject = [
        'BaseModel',
        'extend',
        'relationManager'
    ];

    function CheckContextFactory(BaseModel,
                                 extend,
                                 relationManager) {

        function CheckContext() {

            this.id = undefined;
            this.description = undefined;
            this.displayName = undefined;
            this.parent = undefined;

            BaseModel.apply(this, arguments);
        }

        extend(CheckContext, BaseModel);

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