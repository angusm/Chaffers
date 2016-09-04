(() => {

    angular.module('chaffers').factory('Player', PlayerFactory);

    PlayerFactory.$inject = [
        'ChaffersModel',
        'extend',
        'User',
        'relationManager'
    ];

    function PlayerFactory(
        ChaffersModel,
        extend,
        User,
        relationManager
    ) {

        function Player() {
            this.callSuper('constructor');
        }
        extend(Player, ChaffersModel);

        // Relations
        relationManager.registerHasOneRelation(Player, 'user', User);

        // Django Fields
        Player.createDjangoField('masteredGames');
        Player.createDjangoField('user');

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
