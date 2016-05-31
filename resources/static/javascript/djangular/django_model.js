(function() {

    angular.module('djangular').factory(
        'DjangoModel',
        [
            'BackendModel',
            'extend',
            'isDef',
            DjangoModelFactory
        ]
    );

    function DjangoModelFactory(
        BackendModel,
        extend,
        isDef
    ) {

        function DjangoModel() {
            BackendModel.apply(this);
            this.id = undefined;
            this.djangoValues = {};
            this.loadingDjangoValue = {};
        }
        extend(DjangoModel, BackendModel);

        DjangoModel.prototype.getDataQueryURL = getDataQueryURL;
        DjangoModel.prototype.getDjangoFields = getDjangoFields;
        DjangoModel.prototype.getUnpopulatedDjangoFields = getUnpopulatedDjangoFields;

        return DjangoModel;
        // STOP! Functions only past this point

        /**
         * Returns an array of the django field values that have not been
         * populated on the current instance
         * @returns {Array.<*>}
         */
        function getUnpopulatedDjangoFields() {
            var djangoValues = this.djangoValues;
            return Object.keys(djangoValues).filter(function(djangoFieldName) {
                return !isDef(djangoValues[djangoFieldName]);
            });
        }

        function getDjangoFields() {
            return Object.keys(this.djangoValues);
        }

        /**
         * Returns the URL to which requests should be sent for instance data
         * @returns {string}
         */
        function getDataQueryURL() {
            return '';
        }

    }

})();