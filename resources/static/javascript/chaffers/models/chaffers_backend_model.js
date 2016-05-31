(function() {

    angular.module('chaffers').factory('ChaffersModel', ChaffersModelFactory);

    ChaffersModelFactory.$inject = [
        'DjangoModel',
        'extend'
    ];

    function ChaffersModelFactory(
        DjangoModel,
        extend
    ) {

        function ChaffersModel() {
            DjangoModel.apply(this);
        }
        extend(ChaffersModel, DjangoModel);

        // Relations

        // Functions
        ChaffersModel.prototype.getDataQueryURL = getDataQueryURL;

        return ChaffersModel;
        // STOP! Functions only past this point alright.

        function getDataQueryURL() {
            return '/resources';
        }

    }

})();
