(() => {
    angular.module('chaffers').factory('GameBoardPosition', [
        'ChaffersModel',
        'extend',
        'implement',
        'Position2d',
        gameBoardPositionFactory
    ]);

    function gameBoardPositionFactory(
        ChaffersModel,
        extend,
        implement,
        Position2d
    ) {

        /**
         * Class to contain Character Trait data and functionality
         * @constructor
         */
        function GameBoardPosition() {
            this.callSuper('constructor');
        }

        // Inherit from the Base Model since this is a backend model
        extend(GameBoardPosition, ChaffersModel);
        implement(GameBoardPosition, Position2d);

        // Attach relations

        // Django Fields
        GameBoardPosition.createDjangoField('x');
        GameBoardPosition.createDjangoField('y');

        return GameBoardPosition;

    }

})();
