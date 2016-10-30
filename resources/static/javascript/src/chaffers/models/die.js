export default class Die {
    constructor() {
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
