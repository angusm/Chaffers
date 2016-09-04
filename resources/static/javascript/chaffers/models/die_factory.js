(() => {

    angular.module('chaffers').factory('Die', DieFactory);

    DieFactory.$inject = [
        'BaseModel',
        'extend'
    ];

    function DieFactory(
        BaseModel,
        extend
    ) {

        function Die() {
            this.callSuper('constructor');
            this.value = undefined;
            this.sides = 6;
            this.roll();
        }

        extend(Die, BaseModel);

        // Relations

        // Functions
        Die.prototype.roll = roll;
        Die.prototype.getValue = getValue;

        return Die;
        // STOP! Functions only past this point alright.

        /**
         * Get a new value for the given die
         */
        function roll() {
            this.value = Math.round(Math.random() * (this.sides - 1) + 1);
        }

        /**
         * Return the value of the die
         * @returns {*}
         */
        function getValue() {
            return this.value;
        }

    }

})();