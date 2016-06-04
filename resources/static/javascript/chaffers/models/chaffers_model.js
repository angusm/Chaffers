(function() {

    angular.module('chaffers').factory('ChaffersModel', ChaffersModelFactory);

    ChaffersModelFactory.$inject = [
        'DjangoModel',
        'extend',
        'classMethod'
    ];

    function ChaffersModelFactory(
        DjangoModel,
        extend,
        classMethod
    ) {

        function ChaffersModel() {
            this.callSuper('constructor');
        }
        extend(ChaffersModel, DjangoModel);

        // Relations

        // Class Methods
        classMethod(ChaffersModel, 'getDataQueryURL', getDataQueryURL);

        // Instance Methods

        return ChaffersModel;
        // STOP! Functions only past this point alright.

        function getDataQueryURL() {
            return '/resources';
        }

    }

})();
