(() => {

    angular.module('backendModels').factory('createPopulatedInstances', [
        'createPopulatedInstance',
        createPopulatedInstancesFactory
    ]);

    function createPopulatedInstancesFactory(createPopulatedInstance) {
        /**
         * Creates new instances of the given class and populate it with data
         * @param ClassToUse
         * @param dataForPopulation
         * @returns {*}
         */
        return (ClassToUse, dataForPopulation) => {
            return dataForPopulation.map(function(data) {
                return createPopulatedInstance(ClassToUse, data);
            });
        }
    }

})();
