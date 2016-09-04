(() => {
    angular.module('handies').factory('copyArray', copyArrayFactory);

    copyArrayFactory.$inject = ['emptyArray'];

    function copyArrayFactory(emptyArray) {
        return copyArray;

        /**
         * Empty the ricepient array, then copy the elements
         * of the donor array into the recipient array.
         * This allows the contents of one array to be copied
         * into another while preserving the recipient array's
         * reference
         * @param recipientArray
         * @param donorArray
         */
        function copyArray(recipientArray, donorArray) {
            emptyArray(recipientArray);
            donorArray.forEach(function(donorValue) {
                recipientArray.push(donorValue);
            });
        }
    }
})();
