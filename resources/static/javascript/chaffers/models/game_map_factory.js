(function() {

    angular.module('chaffers').factory('GameMap', [
        'ChaffersModel',
        'Game',
        'extend',
        'relationManager',
        gameMapFactory
    ]);

    function gameMapFactory(
        ChaffersModel,
        Game,
        extend,
        relationManager
    ) {

        function GameMap() {
            this.callSuper('constructor');
        }

        // Django Fields
        GameMap.createDjangoField('game');

        // Inherit from the Base Model since this is a backend model
        extend(GameMap, ChaffersModel);

        // Attach relations
        relationManager.registerHasOneRelation(GameMap, 'game', Game);

        // Instance Functions

        return GameMap;

    }

})();
