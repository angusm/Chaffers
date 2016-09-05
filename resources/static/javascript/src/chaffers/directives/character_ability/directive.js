import formatModifierForDisplay from '../../utility_functions/format_modifier_for_display';

/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
export default function characterAbilityDirective() {

    var directive = {
        restrict: 'E',
        scope: {
            character: '=',
            ability: '=',
            checkContexts: '='
        },
        controller: CharacterAbilityDirectiveController,
        controllerAs: 'characterAbilityVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/character_ability/character_ability.html'
    };


    /**
     * Controller for the character ability directive
     * @constructor
     */
    function CharacterAbilityDirectiveController() {}
    CharacterAbilityDirectiveController.prototype.getFinalModifier = getFinalModifier;

    return directive;
    // STOP! Nothing but functions past this point

    /**
     * Return the modifier for display in the directive
     * @returns {*}
     */
    function getFinalModifier() {

        // Return blank if the character or ability are not properly set up yet
        if (!this.character || !this.character.getFinalAbilityModifier || !this.ability.id) {
            return '';
        }

        var finalModifier = this.character.getFinalAbilityModifier(this.ability, this.checkContexts);
        return formatModifierForDisplay(finalModifier);
    }

}