(function() {

    angular.module('backendModels').factory(
        'BackendModel',
        [
            'BaseModel',
            'extend',
            backendModelFactory
        ]
    );

    function backendModelFactory(
        BaseModel,
        extend
    ) {

        function BackendModel() {
            BaseModel.apply(this);
        }
        extend(BackendModel, BaseModel);

        return BackendModel;
        // STOP! Functions only past this point

    }


})();