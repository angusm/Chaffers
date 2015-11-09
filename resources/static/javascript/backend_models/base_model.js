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

    }

})();