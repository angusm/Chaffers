(function () {

    "use strict";

    angular.module('chaffers').directive('die', Die);

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

    function DieController() {

    }
})();