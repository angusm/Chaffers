(function () {

    "use strict";

    angular.module('chaffers').directive('characterAbility', characterAbilityDirective);

    characterAbilityDirective.$inject = [
        'formatModifierForDisplay'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function characterAbilityDirective(
        formatModifierForDisplay
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                character: '=',
                ability: '='
            },
            controller: CharacterAbilityDirectiveController,
            controllerAs: 'characterAbilityVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_ability/character_ability.html'
        };


        /**
         * Controller for the character ability directive
         * @constructor
         */
        function CharacterAbilityDirectiveController() {
            this.getFinalModifier = getFinalModifier;
        }
        CharacterAbilityDirectiveController.prototype.getFinalModifier = getFinalModifier;

        return directive;
        // STOP! Nothing but functions past this point

        /**
         * Return the modifier for display in the directive
         * @returns {*}
         */
        function getFinalModifier() {

            // Return blank if the character or ability are not properly set up yet
            if (!this.character.getFinalModifier || !this.ability.id) {
                return '';
            }

            var finalModifier = this.character.getFinalModifier(this.ability);
            return formatModifierForDisplay(finalModifier);
        }

    }
})();