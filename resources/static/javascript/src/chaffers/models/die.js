import BaseModel from '../../backend_models/base_model';

export default class Die extends BaseModel {
    constructor() {
        super();
        this.value = undefined;
        this.sides = 6;
        this.roll();
    }

    /**
     * Get a new value for the given die
     */
    roll() {
        this.value = Math.round(Math.random() * (this.sides - 1) + 1);
    }

    /**
     * Return the value of the die
     * @returns {*}
     */
    getValue() {
        return this.value;
    }
}
