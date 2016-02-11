(function () {

    "use strict";

    angular.module('chaffers').factory('AttributeDataService', AttributeDataService);

    AttributeDataService.$inject = [
        'djangoHTTP',
        'Attribute',
        'createPopulatedInstances'
    ];

    function AttributeDataService(
        djangoHTTP,
        Attribute,
        createPopulatedInstances
    ) {
        return {
            getAllAttributes: getAllAttributes
        };

        /**
         * Return a promise that will return an array of attributes
         * @returns {promise}
         */
        function getAllAttributes() {
            return djangoHTTP.post(
                '/attributes/get_all_attributes_data',
                {}
            ).then(getAttributesFromPostResult);
        }

        /**
         * Returns an array of Attributes from the data values in an
         * HTTP post result
         * @param postResult
         * @returns {Attribute[]}
         */
        function getAttributesFromPostResult(postResult) {
            var attributesData = postResult.data.attributes_data;
            return createPopulatedInstances(Attribute, attributesData);
        }

    }

})();
