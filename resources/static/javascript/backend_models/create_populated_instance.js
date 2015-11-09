(function() {

    angular.module('backendModels').factory('createPopulatedInstance', [
        'populateInstance',
        createPopulatedInstanceFactory
    ]);

    function createPopulatedInstanceFactory(populateInstance) {

        return createPopulatedInstance;
        // STOP! It's a function only party past this point.

        /**
         * Create a new instance of the given class and populate it with data
         * @param ClassToUse
         * @param dataForPopulation
         * @returns {*}
         */
        function createPopulatedInstance(ClassToUse, dataForPopulation) {
            var createdInstance = new ClassToUse();
            populateInstance(createdInstance, dataForPopulation);
            return createdInstance;
        }
    }

})();
