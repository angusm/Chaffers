(() => {
    angular.module('handies').factory('isNonNullObject', () => isNonNullObject);

    function isNonNullObject(value) {
        return typeof value === 'object' && value !== null;
    }
})();
