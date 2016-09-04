(() => {

    angular.module('backendModels').factory('caseTransform', () => CaseTransformer);

    class CaseTransformer {

        /**
         * Converts a string to a snake_case to a camelCase string
         * @param snakeCaseString
         * @returns {string} The snake_case string converted to camelCase
         */
        static snakeCaseToCamelCase(snakeCaseString) {
            return snakeCaseString.replace(/(_\w)/g, (snakeCaseMatch) => {
                // We don't care about the underscore part of the match so,
                // we just want the word part of the match
                var matchedString = snakeCaseMatch[1];
                return matchedString.toUpperCase();
            });
        }

        /**
         * Converts a camelCase string to a snake_case string
         * @param camelCaseString
         * @returns {string} The camelCase string converted to snake_case
         */
        static camelCaseToSnakeCase(camelCaseString) {
            return camelCaseString.replace(/([A-Z])/g, (camelCaseMatch) => {
                return '_' + camelCaseMatch.toLowerCase();
            });
        }
    }

})();
