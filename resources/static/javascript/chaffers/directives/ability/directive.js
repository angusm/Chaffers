(function () {

    "use strict";

    angular.module('chaffers').directive('ability', abilityDirective);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function abilityDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                ability: '='
            },
            controller: function () {
            },
            controllerAs: 'abilityVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/ability/ability.html'
        };

        return directive;

    }
})();