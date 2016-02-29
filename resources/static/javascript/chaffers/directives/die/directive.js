(function () {

    "use strict";

    angular.module('chaffers').directive('die', Die);


    // Functions
    DieController.prototype.getDots = getDots;

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function Die() {

        var directive = {
            restrict: 'E',
            scope: {
                die: '='
            },
            controller: DieController,
            controllerAs: 'dieVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/die/die.html'
        };

        return directive;

    }

    function DieController() {}

    /**
     * Return an array with a length that matches the die value
     * @returns {Array}
     */
    function getDots() {
        var dots = [];
        for (var dotCounter = 0; dotCounter < this.die.getValue(); dotCounter++) {
            dots.push('.');
        }
        return dots;
    }
})();