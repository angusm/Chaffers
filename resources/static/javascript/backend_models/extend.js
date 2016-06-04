(function() {

    angular.module('backendModels').factory('extend', extendFactory);

    extendFactory.$inject = ['classProperty', 'isDef'];
    function extendFactory(classProperty, isDef) {

        return extend;

        function extend(ChildClass, ParentClass) {
            ChildClass.prototype = Object.create(ParentClass.prototype);
            ChildClass.prototype.constructor = ChildClass;

            // Handle class methods
            if (isDef(ParentClass.__class_properties__)) {
                ParentClass.__class_properties__.forEach(function(classPropertyPropertyName) {
                    classProperty(ChildClass, classPropertyPropertyName, ParentClass[classPropertyPropertyName], false);
                });
            }

            // Set the class context
            classProperty(ChildClass, 'currentClassContext', ChildClass);

        }

    }

})();
