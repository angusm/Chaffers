(function () {

    angular.module('chaffers').factory('Die', DieFactory);

    DieFactory.$inject = [
        'BaseModel',
        'extend',
        'relationManager'
    ];

    function DieFactory(BaseModel,
                        extend,
                        relationManager) {

        function Die() {
            this.value = undefined;
            this.sides = 6;
            this.roll();
            BaseModel.apply(this, arguments);
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