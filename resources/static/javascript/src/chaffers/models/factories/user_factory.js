UserFactory.$inject = [
    'ChaffersModel',
];
export default UserFactory;

function UserFactory(
    ChaffersModel,
) {
    return class User extends ChaffersModel {
        static getDjangoModelName() {return 'User';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'username'
            ];
        }

        /**
         * Return the user's username
         * @returns {string}
         */
        getUsername() {
            return this.username;
        }
    }
}
