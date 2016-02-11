(function () {

    "use strict";

    angular.module('chaffers').directive('characterAttribute', characterAttributeDirective);

    characterAttributeDirective.$inject = [
        'formatModifierForDisplay'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function characterAttributeDirective(
        formatModifierForDisplay
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                character: '=',
                attribute: '='
            },
            controller: CharacterAttributeDirectiveController,
            controllerAs: 'characterAttributeVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_attribute/character_attribute.html'
        };


        /**
         * Controller for the character attribute directive
         * @constructor
         */
        function CharacterAttributeDirectiveController() {
        }
        CharacterAttributeDirectiveController.prototype.getModifiedAttributeValue = getModifiedAttributeValue;

        return directive;
        // STOP! Nothing but functions past this point

        /**
         * Return the modifier for display in the directive
         * @returns {*}
         */
        function getModifiedAttributeValue() {

            // Return blank if the character or attribute are not properly set up yet
            if (!this.character.getModifiedAttributeValue || !this.attribute.id) {
                return '';
            }

            return this.character.getModifiedAttributeValue(this.attribute);
        }

    }
})();