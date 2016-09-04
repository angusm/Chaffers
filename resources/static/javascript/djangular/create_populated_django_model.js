(() => {

    angular.module('djangular').factory('createPopulatedDjangoModel', [
        'populateDjangoModel',
        createPopulatedDjangoModelFactory
    ]);

    function createPopulatedDjangoModelFactory(
        populateDjangoModel
    ) {

        /**
         * Populate the given instance with data retrieved from the given URL
         * @param targetURL
         * @param ModelClass
         * @param id
         * @returns {*}
         */
        function createPopulatedDjangoModel(ModelClass, id) {
            return populateDjangoModel(ModelClass.createInstanceWithID(id));
        }

        return createPopulatedDjangoModel;
    }

})();