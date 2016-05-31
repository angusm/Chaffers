(function() {

    angular.module('chaffers').factory('GameMap', [
        'ChaffersModel',
        'Game',
        'extend',
        'relationManager',
        'createDjangoField',
        gameMapFactory
    ]);

    function gameMapFactory(
        ChaffersModel,
        Game,
        extend,
        relationManager,
        createDjangoField
    ) {

        function GameMap() {
            ChaffersModel.apply(this);

            createDjangoField(this, 'game');
        }

        // Inherit from the Base Model since this is a backend model
        extend(GameMap, ChaffersModel);

        // Attach relations
        relationManager.registerHasOneRelation(GameMap, 'game', Game);

        // Instance Functions

        return GameMap;

    }

})();
