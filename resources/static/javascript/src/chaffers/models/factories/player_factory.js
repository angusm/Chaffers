PlayerFactory.$inject = [
    'ChaffersModel',
    'User',
    'Game',
];
let Player;
export default PlayerFactory;

function PlayerFactory(
    ChaffersModel,
    User,
    Game,
) {
    Player = Player || class Player extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createCharField('username');
            this.createHasManyField('masteredGames', 'chaffers', 'Game');
            this.createHasOneField('user', 'chaffers', 'User');
        }

        static getModelName() {return 'Player';}

        /**
         * Return the player's username
         * @returns {string}
         */
        getUsername() {
            return this.username;
        }

        /**
         * Return the player's username
         * @returns {User}
         */
        getUser() {
            return this.user;
        }
    };
    return Player;
}
