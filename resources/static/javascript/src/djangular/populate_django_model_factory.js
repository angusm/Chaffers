import CaseTransform from '../backend_models/case_transform';
import isDef from '../handies/functions/is_def';
import populateInstance from '../backend_models/populate_instance';


populateDjangoModelFactory.$inject = ['djangoHTTP', '$q'];
function populateDjangoModelFactory(
    djangoHTTP,
    $q
) {

    /**
     * Populate the given instance with data retrieved from the given URL
     * @param targetURL
     * @param instance
     * @returns {*}
     */
    function populateDjangoModel(instance) {
        if (!isDef(instance.id)) {
            var doNothingPromise = $q.defer();
            doNothingPromise.resolve(instance);
            return doNothingPromise;
        }
        
        return djangoHTTP.post(
            instance.constructor.getDataQueryURL() + '/get_data_by_id',
            {
                model: instance.constructor.getDjangoModelName(),
                id: instance.id,
                fields: instance.getUnpopulatedDjangoFields().map(
                    CaseTransform.camelCaseToSnakeCase
                )
            }
        ).then(
            populateInstanceFromPostResult.bind({}, instance)
        );
    }

    function populateInstanceFromPostResult(instance, postResult) {
        populateInstance(instance, postResult.data.data);
        return instance;
    }

    return populateDjangoModel;
}
export default populateDjangoModelFactory;