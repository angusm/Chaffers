(() => {
    angular.module('handyStructs').factory('DynamicDefaultMap', DynamicDefaultMapFactory);

    DynamicDefaultMapFactory.$inject = [
        'isDef'
    ];

    function DynamicDefaultMapFactory(
        isDef
    ) {

        class DynamicDefaultMap extends Map {

            constructor(defaultGenerator) {
                this.defaultGenerator_ = defaultGenerator;
            }

            get(key) {
                let originalValue = super.get(key);
                if (isDef(originalValue)) {
                    return originalValue;
                } else {
                    let generatedDefault = this.defaultGenerator_(key);
                    this.set(key, generatedDefault);
                    return generatedDefault;
                }
            }

        }

        return DynamicDefaultMap;
    }
})();