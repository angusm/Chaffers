import BackendModel from './backend_model';
import getFirstDefined from '../handies/functions/get_first_defined';
import DynamicDefaultMap from '../handies/structs/maps/dynamic_default';

DjangoModelFactory.$inject = ['djangoHTTP'];
export default DjangoModelFactory;

function DjangoModelFactory(
    djangoHTTP,
) {

    class DjangoModel extends BackendModel {
        constructor(id) {
            super(id);
        }

        static getInstanceWithId(id) {
            this.instanceMap = getFirstDefined(
                this.instanceMap,
                new DynamicDefaultMap((id) => {
                    return new this(id);
                }));
            return this.instanceMap.get(id);
        }

        static getInstancesByIds(ids) {
            return ids.map((id) => this.getInstanceWithId(id));
        }

        static getModelName() {
            throw new Error('Did not override getModelName. Should return name of model in Django.')
        }

        /**
         * Returns an instance of the class for every record in Django
         * @returns {Array<DjangoModel>}
         */
        static getAll() {
            return this.getAllIDs().then(this.getInstancesByIds.bind(this));
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
