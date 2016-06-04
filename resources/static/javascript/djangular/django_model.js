(function() {

    angular.module('djangular').factory(
        'DjangoModel',
        [
            'BackendModel',
            'extend',
            'isDef',
            'djangoHTTP',
            'classMethod',
            'populateDjangoModel',
            DjangoModelFactory
        ]
    );

    function DjangoModelFactory(
        BackendModel,
        extend,
        isDef,
        djangoHTTP,
        classMethod,
        populateDjangoModel
    ) {

        function DjangoModel() {
            this.callSuper('constructor');
            this.id = undefined;
            this.djangoValues = {};
            this.loadingDjangoValue = {};
            this.initDjangoFields();
        }
        extend(DjangoModel, BackendModel);

        // Class methods
        classMethod(DjangoModel, 'createDjangoField', createDjangoField);
        classMethod(DjangoModel, 'getAll', getAll);
        classMethod(DjangoModel, 'getAllIDs', getAllIDs);
        classMethod(DjangoModel, 'getDataQueryURL', getDataQueryURL);
        classMethod(DjangoModel, 'createInstanceWithID', createInstanceWithID);
        classMethod(DjangoModel, 'createInstanceWithIDs', createInstanceWithIDs);
        classMethod(DjangoModel, 'getDjangoFields', getClassDjangoFields);

        // Instance methods
        DjangoModel.prototype.getDjangoFields = getInstanceDjangoFields;
        DjangoModel.prototype.getUnpopulatedDjangoFields = getUnpopulatedDjangoFields;
        DjangoModel.prototype.initDjangoFields = initDjangoFields;
        DjangoModel.prototype.initDjangoField = initDjangoField;
        DjangoModel.prototype.getDjangoFieldValue = getDjangoFieldValue;
        DjangoModel.prototype.setDjangoFieldValue = setDjangoFieldValue;

        return DjangoModel;
        // STOP! Functions only past this point

        /**
         * Adds a django field with the given name to the set of Django Fields
         * on the current class.
         * @param {string} fieldName The field name to add
         */
        function createDjangoField(fieldName) {
            this.getDjangoFields().push(fieldName);
        }

        /**
         * Initializes the django field properties on the current instance.
         */
        function initDjangoFields() {
            this.getClass().getDjangoFields().forEach(this.initDjangoField.bind(this));
        }

        function initDjangoField(fieldName) {
            this.djangoValues[fieldName] = undefined;
            this.loadingDjangoValue[fieldName] = false;
            Object.defineProperty(
                this,
                fieldName, {
                    get: this.getDjangoFieldValue.bind(this, fieldName),
                    set: this.setDjangoFieldValue.bind(this, fieldName)
                }
            );
        }

        function getDjangoFieldValue(fieldName) {
            if (!isDef(this.djangoValues[fieldName]) && !this.loadingDjangoValue[fieldName]) {
                this.loadingDjangoValue[fieldName] = true;
                populateDjangoModel(this);
            }
            return this.djangoValues[fieldName];
        }

        function setDjangoFieldValue(fieldName, value) {
            this.djangoValues[fieldName] = value;
        }

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

        function getClassDjangoFields() {
            if (!isDef(this.djangoFieldNames)) {
                this.djangoFieldNames = [];
                if (this != DjangoModel) {
                    this.djangoFieldNames.push.apply(
                        this.djangoFieldNames,
                        this.getParentClass().getDjangoFields()
                    );
                }
            }
            return this.djangoFieldNames;
        }

        function getInstanceDjangoFields() {
            return this.getClass().getDjangoFields();
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