(function() {

    angular.module('backendModels').factory('extend', extendFactory);

    extendFactory.$inject = [];
    function extendFactory() {

        return extend;

        function extend(ChildClass, ParentClass) {
            ChildClass.prototype = Object.create(ParentClass.prototype);
            ChildClass.prototype.constructor = ChildClass;
        }

    }

})();
