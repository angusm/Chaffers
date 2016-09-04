(() => {

    angular.module('handies').factory('getParentClass', getParentClassFactory);

    function getParentClassFactory() {

        return getParentClass;

        /**
         * Return the parent class of the given class
         * @param classToCheck
         * @returns {Function}
         */
        function getParentClass(classToCheck) {
            return classToCheck.prototype.__proto__.constructor;
        }

    }

})();
