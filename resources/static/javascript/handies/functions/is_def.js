(() => {
    angular.module('handies').factory('isDef', isDefFactory);

    function isDefFactory() {
        return isDef;

        function isDef(value) {
            return typeof value !== 'undefined';
        }
    }
})();
