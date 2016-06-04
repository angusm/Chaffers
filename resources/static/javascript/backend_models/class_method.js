(function() {

    angular.module('chaffers').factory('classMethod', [
        'classProperty',
        classMethodFactory
    ]);

    function classMethodFactory(classProperty) {

        return classMethod;
        // STOP! Nothing but functions past here please

        /**
         * Descriptive alias for class property, easier to extend if functionality diverges
         * @param targetClass
         * @param propertyName
         * @param targetMethod
         */
        function classMethod(targetClass, propertyName, targetMethod) {
            classProperty(targetClass, propertyName, targetMethod);
        }
    }

})();
