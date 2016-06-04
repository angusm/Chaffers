(function() {

    angular.module('chaffers').factory('classProperty', [
        'getFirstDefined',
        classPropertyFactory
    ]);

    function classPropertyFactory(getFirstDefined) {

        return classProperty;
        // STOP! Nothing but functions past here please

        function classProperty(targetClass, propertyName, targetValue) {
            targetClass[propertyName] = targetValue;
            targetClass.__class_properties__ = getFirstDefined(targetClass.__class_properties__, []);
            targetClass.__class_properties__.push(propertyName);
        }
    }

})();
