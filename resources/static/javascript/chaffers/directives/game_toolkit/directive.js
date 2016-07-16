(function () {

    "use strict";

    angular.module('chaffers').directive('gameToolkit', gameToolkitDirective);

    gameToolkitDirective.$inject = [
        'extend',
        'MouseUpdated',
        'Position2d'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function gameToolkitDirective(
        extend,
        MouseUpdated,
        Position2d
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                game: '='
            },
            controller: ['$element', 'djangoHTTP', GameToolkitController],
            controllerAs: 'gameToolkitVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/game_toolkit/game_toolkit.html'
        };

        /**
         * Controller for the character ability directive
         * @constructor
         */
        function GameToolkitController($element, djangoHTTP) {
            MouseUpdated.apply(this, [$element[0]]);
        }
        extend(GameToolkitController, MouseUpdated);

        return directive;
    }
})();