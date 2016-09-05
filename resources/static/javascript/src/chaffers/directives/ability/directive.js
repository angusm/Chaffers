
/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
export default function abilityDirective() {
    return {
        restrict: 'E',
        scope: {
            ability: '='
        },
        controller: function () {
        },
        controllerAs: 'abilityVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/ability/ability.html'
    };
}
