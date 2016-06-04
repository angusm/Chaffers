(function() {

    angular.module('djangular').factory(
        'DjangoModel',
        [
            'BackendModel',
            'extend',
            'isDef',
            'djangoHTTP',
            'classMethod',
            DjangoModelFactory
        ]
    );

    function DjangoModelFactory(
        BackendModel,
        extend,
        isDef,
        djangoHTTP,
        classMethod
    ) {

        function DjangoModel() {
            this.callSuper('constructor');
            this.id = undefined;
            this.djangoValues = {};
            this.loadingDjangoValue = {};
        }
        extend(DjangoModel, BackendModel);

        // Class methods
        classMethod(DjangoModel, 'getAll', getAll);
        classMethod(DjangoModel, 'getAllIDs', getAllIDs);
        classMethod(DjangoModel, 'getDataQueryURL', getDataQueryURL);
        classMethod(DjangoModel, 'createInstanceWithID', createInstanceWithID);
        classMethod(DjangoModel, 'createInstanceWithIDs', createInstanceWithIDs);

        // Instance methods
        DjangoModel.prototype.getDjangoFields = getDjangoFields;
        DjangoModel.prototype.getUnpopulatedDjangoFields = getUnpopulatedDjangoFields;

        return DjangoModel;
        // STOP! Functions only past this point

        /**
         * Returns an instance of the class for every record in Django
         * @returns {Array<DjangoModel>}
         */
        function getAll() {
            var CurrentClass = this;
            return this.getAllIDs().then(this.createInstanceWithIDs.bind(this));
        }

        function createInstanceWithIDs(ids) {
            return ids.map(this.createInstanceWithID.bind(this));
        }

        function createInstanceWithID(id) {
            var CurrentClass = this;
            var instance = new CurrentClass();
            instance.id = id;
            return instance;
        }

        /**
         * Return all of the IDs for the current model
         * @returns {*}
         */
        function getAllIDs() {
            return djangoHTTP.post(
                this.getDataQueryURL() + '/get_all_ids',
                {
                    model: this.name
                }
            ).then(function(postResult) {
                return postResult.data.ids;
            });
        }

        /**
         * Returns an array of the django field values that have not been
         * populated on the current instance
         * @returns {Array.<*>}
         */
        function getUnpopulatedDjangoFields() {
            var djangoValues = this.djangoValues;
            return this.getDjangoFields().filter(function(djangoFieldName) {
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
            throw new Error('getDataQueryURL must be overridden in child Class');
        }

    }

})();