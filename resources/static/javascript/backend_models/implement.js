(function() {

    angular.module('backendModels').factory('implement', implementFactory);

    implementFactory.$inject = ['classProperty', 'isDef'];
    function implementFactory(classProperty, isDef) {

        return implement;

        function implement(TargetClass, InterfaceClass) {
            var interfacePrototype = Object.create(InterfaceClass.prototype);
            Object.keys(interfacePrototype).forEach(function(prototypeFunctionName) {
               TargetClass.prototype[prototypeFunctionName] = interfacePrototype[prototypeFunctionName];
            });

            // Handle class methods
            if (isDef(InterfaceClass.__class_properties__)) {
                InterfaceClass.__class_properties__.forEach(function(classPropertyPropertyName) {
                    classProperty(TargetClass, classPropertyPropertyName, InterfaceClass[classPropertyPropertyName], false);
                });
            }
        }

    }

})();
