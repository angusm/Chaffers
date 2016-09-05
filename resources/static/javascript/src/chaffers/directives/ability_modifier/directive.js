/**
 * Directive handler for an ability modifier
 * @returns {Object} the directive object for an ability modifier
 */
export default function abilityModifier() {
    return {
        restrict: 'E',
        scope: {
            abilityModifier: '='
        },
        controller: () => {},
        controllerAs: 'abilityModifierVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/ability_modifier_display/ability_modifier.html'
    };
}
