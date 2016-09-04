(() => {

    angular.module('backendModels').factory('createPopulatedInstance', [
        'populateInstance',
        createPopulatedInstanceFactory
    ]);

    function createPopulatedInstanceFactory(populateInstance) {
        /**
         * Create a new instance of the given class and populate it with data
         * @param ClassToUse
         * @param dataForPopulation
         * @returns {*}
         */
        return (ClassToUse, dataForPopulation) => {
            var createdInstance = new ClassToUse();
            populateInstance(createdInstance, dataForPopulation);
            return createdInstance;
        }
    }

})();
