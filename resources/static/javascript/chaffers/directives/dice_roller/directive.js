(function () {

    "use strict";

    angular.module('chaffers').directive('diceRoller', DiceRoller);

    // Controller injection
    DiceRollerController.$inject = ['Die'];

    // Controller functions
    DiceRollerController.prototype.roll = roll;
    DiceRollerController.prototype.getDiceTotal = getDiceTotal;

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function DiceRoller() {

        var directive = {
            restrict: 'E',
            scope: {},
            controller: DiceRollerController,
            controllerAs: 'diceRollerVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/dice_roller/dice_roller.html'
        };

        return directive;

    }

    function DiceRollerController(Die) {
        this.dice = [
            new Die(),
            new Die()
        ];
    }

    /**
     * Roll all of the instance's dice
     */
    function roll() {
        this.dice.forEach(function(die) {
            die.roll();
        });
    }

    /**
     * Returns the total value for all of the dice
     * @returns {number}
     */
    function getDiceTotal() {
        var total = 0;
        this.dice.forEach(function(die) {
            total += die.getValue();
        });
        return total;
    }

})();