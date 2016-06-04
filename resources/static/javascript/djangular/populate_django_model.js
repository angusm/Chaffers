(function() {

    angular.module('djangular').factory('populateDjangoModel', [
        'djangoHTTP',
        'populateInstance',
        'caseTransform',
        'isDef',
        '$q',
        populateDjangoModelFactory
    ]);

    function populateDjangoModelFactory(
        djangoHTTP,
        populateInstance,
        caseTransform,
        isDef,
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
                instance.getClass().getDataQueryURL() + '/get_data_by_id',
                {
                    model: instance.constructor.name,
                    id: instance.id,
                    fields: instance.getUnpopulatedDjangoFields().map(
                        caseTransform.camelCaseToSnakeCase
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

})();