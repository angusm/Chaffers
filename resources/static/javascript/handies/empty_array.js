(function() {
    angular.module('handies').factory('emptyArray', emptyArrayFactory);

    function emptyArrayFactory() {
        return emptyArray;

        /**
         * Remove all elements from the given array while preserving
         * the reference
         * @param arrayToEmpty
         */
        function emptyArray(arrayToEmpty) {
            while (arrayToEmpty.length > 0) {
                arrayToEmpty.pop();
            }
        }
    }
})();
