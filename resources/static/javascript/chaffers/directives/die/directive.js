(function () {

    "use strict";

    angular.module('chaffers').directive('die', Die);

    // Constants


    // Functions
    DieController.prototype.getCSSClass = getCSSClass;

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
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
     * Returns a CSS class used to style the die based on its value.
     * @returns {string} The CSS class used to style the die.
     */
    function getCSSClass() {
        return 'die-display-' + this.die.getValue();
    }
})();