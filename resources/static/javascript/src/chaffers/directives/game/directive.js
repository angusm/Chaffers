gameDirective.$inject = [
    'createPopulatedDjangoModel',
    'djangoHTTP',
    'Game'
];
export default gameDirective;

/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
function gameDirective(
    createPopulatedDjangoModel,
    djangoHTTP,
    Game
) {

    var directive = {
        restrict: 'E',
        scope: {
            gameId: '='
        },
        controller: ['djangoHTTP', GameController],
        controllerAs: 'gameVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/game/game.html'
    };


    /**
     * Controller for the character ability directive
     * @constructor
     */
    function GameController(djangoHTTP) {
        this.djangoHTTP = djangoHTTP;
        createPopulatedDjangoModel(Game, this.gameId).then(setGame.bind(this));
    }

    // Functions
    GameController.prototype.getCurrentMap = getCurrentMap;
    GameController.prototype.getGame = getGame;
    GameController.prototype.setGame = setGame;

    return directive;
    // STOP! Nothing but functions past this point

    function getCurrentMap() {
        this.getGame().getCurrentMap();
    }

    function getGame() {
        return this.game;
    }

    function setGame(game) {
        this.game = game;
    }

}