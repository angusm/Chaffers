(function() {

    angular.module('backendModels').factory('extend', extendFactory);

    extendFactory.$inject = ['classMethod', 'isDef'];
    function extendFactory(classMethod, isDef) {

        return extend;

        function extend(ChildClass, ParentClass) {
            ChildClass.prototype = Object.create(ParentClass.prototype);
            ChildClass.prototype.constructor = ChildClass;

            // Handle class methods
            if (isDef(ParentClass.__class_properties__)) {
                ParentClass.__class_properties__.forEach(function(classMethodPropertyName) {
                    classMethod(ChildClass, classMethodPropertyName, ParentClass[classMethodPropertyName]);
                });
            }

        }

    }

})();
