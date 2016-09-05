import Die from '../../models/die';

    // Controller functions
    DiceRollerController.prototype.getDice = getDice;
    DiceRollerController.prototype.getDiceTotal = getDiceTotal;
    DiceRollerController.prototype.isLastDie = isLastDie;
    DiceRollerController.prototype.roll = roll;


    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function DiceRoller() {

        var directive = {
            restrict: 'E',
            scope: {},
            controller: DiceRollerController,
            controllerAs: 'diceRollerVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/dice_roller/dice_roller.html'
        };

        return directive;

    }

    function DiceRollerController() {
        this.dice = [
            new Die(),
            new Die()
        ];
    }

    /**
     * Returns the dice the controller is responsible for.
     * Used as a function in place of a list to ease refactoring.
     * @returns {Array|*[]}
     */
    function getDice() {
        return this.dice;
    }

    /**
     * Returns the total value for all of the dice
     * @returns {number}
     */
    function getDiceTotal() {
        var total = 0;
        this.getDice().forEach(function(die) {
            total += die.getValue();
        });
        return total;
    }

    /**
     * Returns true if the given die is the last die in the set.
     * @param {Die} die The die in question.
     * @returns {boolean} True if the given die is the last die in the list.
     */
    function isLastDie(die) {
        return this.getDice().indexOf(die) == this.getDice().length - 1;
    }

    /**
     * Roll all of the instance's dice
     */
    function roll() {
        this.getDice().forEach(function(die) {
            die.roll();
        });
    }

    export default DiceRoller;