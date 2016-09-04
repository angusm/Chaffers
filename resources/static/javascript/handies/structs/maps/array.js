(() => {
    angular.module('handyStructs').factory('ArrayMap', ArrayMapFactory);

    ArrayMapFactory.$inject = [
        'isArray'
    ];

    function ArrayMapFactory(
        isArray
    ) {

        class ArrayMap extends DynamicDefaultMap {

            constructor() {
                super(() => {
                    return [];
                });
            }

            pushOnArray(key, value) {
                this.get(key).push(value);
            }

            removeFromArray(key, value) {
                let values = this.get(key);
                if (value.indexOf(value) != -1) {
                    values.splice(values.indexOf(value), 1);
                }
            }

            set(key, value) {
                if (!isArray(value)) {
                    throw new Error('Value is not an Array');
                }
                super.set(key, value);
            }

        }

        return ArrayMap;
    }
})();