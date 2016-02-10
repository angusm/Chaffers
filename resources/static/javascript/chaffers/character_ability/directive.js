(function () {

    "use strict";

    angular.module('chaffers').directive('characterAbility', characterAbilityDirective);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function characterAbilityDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                character: '=',
                ability: '='
            },
            controller: CharacterAbilityDirectiveController,
            controllerAs: 'VM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/.html'
        };

        function CharacterAbilityDirectiveController() {

        }
        CharacterAbilityDirectiveController.prototype.getFinalModifier = getFinalModifier;

        return directive;


        function getFinalModifier() {
            var finalModifier = this.character.getFinalModifier(this.ability);
        }

    }
})();