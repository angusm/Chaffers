(() => {

    angular.module('backendModels').factory('implement', [
        'isDef',
        'isFunction',
        implementFactory
    ]);

    function implementFactory(
        isDef,
        isFunction,
    ) {

        return implement;

        function implement(TargetClass, InterfaceClass) {

            // Implement functions from InterfaceClass itself
            getAllProperties(InterfaceClass).filter((interfaceFnName) => {
                if (
                    isFunction(InterfaceClass[interfaceFnName]) &&
                    !isDef(TargetClass[interfaceFnName])
                ) {
                    TargetClass[interfaceFnName] =
                        InterfaceClass[interfaceFnName];
                }
            });

            // Recursively implement functions from InterfaceClass' parent
            // classes
            if (isDef(InterfaceClass.prototype)) {
                implement(TargetClass, InterfaceClass.prototype);
            }
        }

        function getAllProperties(SomeClass) {
            return [
                ...getStaticProperties(SomeClass),
                ...getDynamicProperties(SomeClass)
            ];
        }

        function getStaticProperties(SomeClass) {
            return Object.getOwnPropertyNames(SomeClass);
        }

        function getDynamicProperties(SomeClass) {
            return Object.getOwnPropertyNames(Object.getPrototypeOf(SomeClass));
        }
    }

})();
