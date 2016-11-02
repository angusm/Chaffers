UserFactory.$inject = [
    'ChaffersModel',
];
let User;
export default UserFactory;

function UserFactory(
    ChaffersModel,
) {
    User = User || class User extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createCharField('username');
        }

        static getModelName() {return 'User';}

        /**
         * Return the user's username
         * @returns {string}
         */
        getUsername() {
            return this.username;
        }
    };
    return User;
}
