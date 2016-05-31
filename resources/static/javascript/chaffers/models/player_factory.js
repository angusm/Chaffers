(function() {

    angular.module('chaffers').factory('Player', PlayerFactory);

    PlayerFactory.$inject = [
        'ChaffersModel',
        'extend',
        'User',
        'relationManager',
        'createDjangoField'
    ];

    function PlayerFactory(
        ChaffersModel,
        extend,
        User,
        relationManager,
        createDjangoField
    ) {

        function Player() {
            ChaffersModel.apply(this);

            createDjangoField(this, 'masteredGames');
            createDjangoField(this, 'user');
            createDjangoField(this, 'username');
        }
        extend(Player, ChaffersModel);

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
