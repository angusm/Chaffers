(function () {

    "use strict";

    angular.module('chaffers').directive('game', gameDirective);

    gameDirective.$inject = [
        'createPopulatedInstance',
        'djangoHTTP'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function gameDirective(
        createPopulatedInstance,
        djangoHTTP
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                gameId: '='
            },
            controller: ['djangoHTTP', GameController],
            controllerAs: 'gameVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/game/game.html'
        };


        /**
         * Controller for the character ability directive
         * @constructor
         */
        function GameController(djangoHTTP) {
            this.djangoHTTP = djangoHTTP;
        }

        // Functions
        // GameController.prototype.getPlayer = getPlayer;

        return directive;
        // STOP! Nothing but functions past this point

    }
})();