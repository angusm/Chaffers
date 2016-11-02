class MapWrapper {
    constructor() {
        this.map_ = new Map();
    }

    get size() {
        return this.map_.size;
    }

    clear() {
        return this.map_.clear.apply(this, arguments);
    }
    delete() {
        return this.map_.delete.apply(this, arguments);
    }
    entries() {
        return this.map_.entries.apply(this, arguments);
    }
    forEach() {
        return this.map_.forEach.apply(this, arguments);
    }
    get(key) {
        return this.map_.get(key);
    }
    has(key) {
        return this.map_.has(key);
    }
    keys() {
        return this.map_.keys.apply(this, arguments);
    }
    set(key, value) {
        return this.map_.set(key, value);
    }
    values() {
        return this.map_.values.apply(this, arguments);
    }
    [Symbol.iterator]() {
        return this.map_[Symbol.iterator].apply(this, arguments);
    }
}

export default MapWrapper;