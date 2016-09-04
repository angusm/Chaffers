(() => {

    angular.module('djangular').factory(
        'DjangoModel',
        [
            'BackendModel',
            'createPopulatedInstance',
            'djangoHTTP',
            'populateDjangoModel',
            DjangoModelFactory
        ]
    );

    function DjangoModelFactory(
        BackendModel,
        createPopulatedInstance,
        djangoHTTP,
        populateDjangoModel,
    ) {

        class DjangoModel extends BackendModel {

            constructor() {
                super();
                this.id = undefined;
                this.djangoValues = new Map();
                this.loadingDjangoValue = new Map();
                this.initDjangoFields();
            }

            static createInstanceWithIDs(ids) {
                return ids.map((id) => this.createInstanceWithID(id));
            }

            static createInstanceWithID(id) {
                return createPopulatedInstance(this, {id: id});
            }
            
            /**
             * Returns an instance of the class for every record in Django
             * @returns {Array<DjangoModel>}
             */
            static getAll() {
                return this.getAllIDs().then(this.createInstanceWithIDs.bind(this));
            }

            /**
             * Return all of the IDs for the current model
             * @returns {*}
             */
            static getAllIDs() {
                return djangoHTTP.post(
                    this.getDataQueryURL() + '/get_all_ids',
                    {
                        model: this.name
                    }
                ).then((postResult) => {
                    return postResult.data.ids;
                });
            }

            /**
             * Returns the URL to which requests should be sent for instance data
             * @returns {string}
             */
            static getDataQueryURL() {
                throw new Error('getDataQueryURL must be overridden in child Class');
            }

            /**
             * Returns the name of all the properties on the class that
             * correspond to Django fields
             * @returns {Array}
             */
            static getDjangoFields() {
                return [];
            }

            getDjangoFields() {
                return this.constructor.getDjangoFields();
            }

            getDjangoFieldValue(fieldName) {
                if (!this.djangoValues.has(fieldName) && !this.loadingDjangoValue.get(fieldName)) {
                    this.loadingDjangoValue.set(fieldName, true);
                    populateDjangoModel(this);
                }
                return this.djangoValues.get(fieldName);
            }

            /**
             * Returns an array of the django field values that have not been
             * populated on the current instance
             * @returns {Array.<*>}
             */
            getUnpopulatedDjangoFields() {
                return this.getDjangoFields().filter((djangoFieldName) => {
                    return !this.djangoValues.has(djangoFieldName);
                });
            }

            getViewURL() {
                throw new Error('getViewURL must be overridden in child class.');
            }

            initDjangoField(fieldName) {
                this.loadingDjangoValue.set(fieldName, false);
                Object.defineProperty(
                    this,
                    fieldName, {
                        get: this.getDjangoFieldValue.bind(this, fieldName),
                        set: this.setDjangoFieldValue.bind(this, fieldName)
                    }
                );
            }

            /**
             * Initializes the django field properties on the current instance.
             */
            initDjangoFields() {
                this.constructor.getDjangoFields().map((djangoField) => {
                    this.initDjangoField(djangoField);
                });
            }

            setDjangoFieldValue(fieldName, value) {
                this.djangoValues.set(fieldName, value);
            }
        }

        return DjangoModel;
        // STOP! Functions only past this point

    }

})();