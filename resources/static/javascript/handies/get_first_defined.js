(function() {

    angular.module('handies').factory('getFirstDefined', getFirstDefinedFactory);

    function getFirstDefinedFactory() {

        return getFirstDefined;

        /**
         * Returns the first argument to the function that is not undefined
         * @returns {*}
         */
        function getFirstDefined() {

            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] !== 'undefined') {
                    return arguments[i];
                }
            }

        }

    }

})();
