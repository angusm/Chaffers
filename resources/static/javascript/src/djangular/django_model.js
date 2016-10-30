import BackendModel from './backend_model';


DjangoModelFactory.$inject = ['djangoHTTP'];
export default DjangoModelFactory;

function DjangoModelFactory(
    djangoHTTP,
) {

    class DjangoModel extends BackendModel {
        constructor(id) {
            super(id);
        }

        static createInstancesWithIDs(ids) {
            return ids.map((id) => new this(id));
        }

        static getModelName() {
            throw new Error('Did not override getModelName. Should return name of model in Django.')
        }

        /**
         * Returns an instance of the class for every record in Django
         * @returns {Array<DjangoModel>}
         */
        static getAll() {
            return this.getAllIDs().then(this.createInstancesWithIDs.bind(this));
        }

        /**
         * Return all of the IDs for the current model
         * @returns {*}
         */
        static getAllIDs() {
            return djangoHTTP.post(
                this.getDataQueryURL() + '/get_all_ids',
                {
                    model: this.getModelName()
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

        getViewURL() {
            throw new Error('getViewURL must be overridden in child class.');
        }
    }

    return DjangoModel;
    // STOP! Functions only past this point
}
