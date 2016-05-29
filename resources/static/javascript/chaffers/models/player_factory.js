(function() {

    angular.module('chaffers').factory('Player', PlayerFactory);

    PlayerFactory.$inject = [
        'BaseModel',
        'extend',
        'User',
        'relationManager'
    ];

    function PlayerFactory(
        BaseModel,
        extend,
        User,
        relationManager
    ) {

        function Player() {

            this.id = undefined;
            this.masteredGames = undefined;
            this.user = undefined;
            this.username = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(Player, BaseModel);

        // Relations
        relationManager.registerHasOneRelation(Player, 'user', User);

        // Functions
        Player.prototype.getUser = getUser;
        Player.prototype.getUsername = getUsername;

        return Player;
        // STOP! Functions only past this point alright.

        /**
         * Return the player's username
         * @returns {string}
         */
        function getUsername() {
            return this.username;
        }

        /**
         * Return the player's username
         * @returns {User}
         */
        function getUser() {
            return this.user;
        }
    }

})();
