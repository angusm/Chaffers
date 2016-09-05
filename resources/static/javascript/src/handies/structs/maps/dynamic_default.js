import isDef from '../../functions/is_def';
import MapWrapper from './map_wrapper';

export default class DynamicDefaultMap extends MapWrapper {
    constructor(defaultGenerator) {
        super();
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
