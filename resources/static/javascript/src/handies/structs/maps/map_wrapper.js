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
    get() {
        return this.map_.get.apply(this, arguments);
    }
    has() {
        return this.map_.has.apply(this, arguments);
    }
    keys() {
        return this.map_.keys.apply(this, arguments);
    }
    set() {
        return this.map_.set.apply(this, arguments);
    }
    values() {
        return this.map_.values.apply(this, arguments);
    }
    [Symbol.iterator]() {
        return this.map_[Symbol.iterator].apply(this, arguments);
    }
}

export default MapWrapper;