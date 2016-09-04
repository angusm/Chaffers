(() => {

    angular.module('chaffers').factory('ChaffersModel', [
        'DjangoModel',
        ChaffersModelFactory,
    ]);

    function ChaffersModelFactory(
        DjangoModel,
    ) {

        class ChaffersModel extends DjangoModel {
            static getDataQueryURL() {
                return '/resources';
            }

            getViewURL() {
                return '/resources/view/' + this.constructor.name + '/' +
                    this.id;
            }
        }

    }

})();
