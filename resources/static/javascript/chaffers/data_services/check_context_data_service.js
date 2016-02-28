(function () {

    "use strict";

    angular.module('chaffers').factory('CheckContextDataService', CheckContextDataService);

    CheckContextDataService.$inject = [
        'djangoHTTP',
        'CheckContext',
        'createPopulatedInstances'
    ];

    function CheckContextDataService(
        djangoHTTP,
        CheckContext,
        createPopulatedInstances
    ) {
        return {
            getAllCheckContexts: getAllCheckContexts
        };

        /**
         * Return a promise that will return an array of CheckContexts
         * @returns {promise}
         */
        function getAllCheckContexts() {
            return djangoHTTP.post(
                '/check_contexts/get_all_check_contexts_data',
                {}
            ).then(getCheckContextsFromPostResult);
        }

        /**
         * Returns an array of CheckContexts from the data values in an
         * HTTP post result
         * @param postResult
         * @returns {CheckContext[]}
         */
        function getCheckContextsFromPostResult(postResult) {
            var checkContextsData = postResult.data.check_contexts_data;
            return createPopulatedInstances(CheckContext, checkContextsData);
        }

    }

})();
