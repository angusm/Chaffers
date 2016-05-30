(function() {

    angular.module('chaffers').factory('GameMap', [
        'BaseModel',
        'Game',
        'extend',
        'relationManager',
        gameMapFactory
    ]);

    function gameMapFactory(
        BaseModel,
        Game,
        extend,
        relationManager
    ) {

        function GameMap() {

            this.game = undefined;

            BaseModel.apply(this, arguments);
        }

        // Inherit from the Base Model since this is a backend model
        extend(GameMap, BaseModel);

        // Attach relations
        relationManager.registerHasOneRelation(GameMap, 'game', Game);

        // Instance Functions

        return GameMap;

    }

})();
