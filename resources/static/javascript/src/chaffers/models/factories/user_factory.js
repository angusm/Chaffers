UserFactory.$inject = [
    'ChaffersModel',
];
export default UserFactory;

function UserFactory(
    ChaffersModel,
) {
    return class User extends ChaffersModel {
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
    }
}
