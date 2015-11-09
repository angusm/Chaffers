(function() {

    angular.module('backendModels').factory(
        'BaseModel',
        [
            baseModelFactory
        ]
    );

    function baseModelFactory() {

        function BaseModel() {
        }

        return BaseModel;
        // STOP! Functions only past this point

    }

})();