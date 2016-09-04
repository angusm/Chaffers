(() => {
    angular.module('handies').factory('isFunction', isFunctionFactory);

    function isFunctionFactory() {
        return isFunction;

        function isFunction(value) {
            return typeof value === 'function';
        }
    }
})();
