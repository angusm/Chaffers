(() => {
    angular.module('handies').factory('isArray', isArrayFactory);

    function isArrayFactory() {
        return isArray;

        function isArray(value) {
            return typeof value === 'object' && typeof value.length === 'number';
        }
    }
})();
