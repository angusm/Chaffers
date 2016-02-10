(function () {

    "use strict";

    angular.module('chaffers').factory('AbilityDataService', AbilityDataService);

    AbilityDataService.$inject = [
        'djangoHTTP',
        'Ability',
        'createPopulatedInstances'
    ];

    function AbilityDataService(
        djangoHTTP,
        Ability,
        createPopulatedInstances
    ) {
        return {
            getAllAbilities: getAllAbilities
        };

        /**
         * Return a promise that will return an array of abilities
         * @returns {promise}
         */
        function getAllAbilities() {
            return djangoHTTP.post(
                '/abilities/get_all_abilities_data',
                {}
            ).then(getAbilitiesFromPostResult);
        }

        /**
         * Returns an array of Abilities from the data values in an
         * HTTP post result
         * @param postResult
         * @returns {Ability[]}
         */
        function getAbilitiesFromPostResult(postResult) {
            var abilitiesData = postResult.data.abilities_data;
            return createPopulatedInstances(Ability, abilitiesData);
        }

    }

})();
