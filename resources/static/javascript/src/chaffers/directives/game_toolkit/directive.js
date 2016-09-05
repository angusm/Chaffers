/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
export default function gameToolkitDirective() {
    return {
        restrict: 'E',
        scope: {
            game: '='
        },
        controller: () => {},
        controllerAs: 'gameToolkitVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/game_toolkit/game_toolkit.html'
    };
}