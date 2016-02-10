(function () {

    "use strict";

    angular.module('chaffers').factory('AbilityDataService', AbilityDataService);

    AbilityDataService.$inject = [
        'djangoHTTP',
        'Ability',
        'createPopulatedInstance'
    ];

    function AbilityDataService() {
        return {}
    }

})();
