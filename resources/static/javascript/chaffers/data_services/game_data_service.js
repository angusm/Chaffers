(function() {

    angular.module('chaffers').factory('GameDataService', GameDataService);

    GameDataService.$inject = [
        'djangoHTTP',
        'Game',
        'createPopulatedInstance'
    ];
    function GameDataService(
        djangoHTTP,
        Game,
        createPopulatedInstance
    ) {
        return {
            getGameById: getGameById
        };

        /**
         * Return the game with the given ID populated
         * with data retrieved from the backend.
         * @param djangoHTTP
         * @param gameId
         * @returns {Game}
         */
        function getGameById(gameId) {
            return djangoHTTP.post(
                '/games/get_game_data_by_id',
                {
                    game_id: gameId
                }
            ).then(getGameFromPostResult);
        }

        /**
         * Return a game from a post result containing
         * the game's data in a game_data propery
         * of its data property
         * @param postResult
         */
        function getGameFromPostResult(postResult) {
            return getGameFromGameData(postResult.data.game_data);
        }

        /**
         * Return a populated instance of a Game using
         * the given data
         * @param gameData
         * @returns {Game}
         */
        function getGameFromGameData(gameData) {
            return createPopulatedInstance(Game, gameData);
        }
    }

})();
