import isDef from '../handies/functions/is_def';
import isFunction from '../handies/functions/is_function';

/**
 * NOTE: In order to implement a function it must define its own properties.
 *      Implement only grafts on function properties.
 * @param TargetClass
 * @param InterfaceClass
 */
export default function implement(TargetClass, InterfaceClass) {
    // Implement functions from InterfaceClass itself
    getAllProperties(InterfaceClass).filter((interfaceFnName) => {
        if (
            isFunction(InterfaceClass[interfaceFnName]) &&
            !isDef(TargetClass[interfaceFnName])
        ) {
            TargetClass[interfaceFnName] = InterfaceClass[interfaceFnName];
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
