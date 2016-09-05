PlayerFactory.$inject = [
    'ChaffersModel',
    'User',
];
export default PlayerFactory;

function PlayerFactory(
    ChaffersModel,
    User,
) {
    return class Player extends ChaffersModel {
        static getDjangoModelName() {return 'Player';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'masteredGames',
                'user',
            ];
        }

        static getHasOneRelations() {
            return super.getHasOneRelations().set('user', User);
        }

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
    }
}
