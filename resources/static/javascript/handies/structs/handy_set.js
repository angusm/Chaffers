(() => {
    angular.module('handyStructs').factory('HandySet', () => HandySet);

    class HandySet extends Set {
        intersect(rawValues) {
            let values = new Set(rawValues);
            return new Set(this.entries().filter((val) => values.has(val)));
        }
    }
})();