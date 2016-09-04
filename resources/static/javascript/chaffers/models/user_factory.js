(() => {

    angular.module('chaffers').factory('User', UserFactory);

    UserFactory.$inject = [
        'ChaffersModel',
        'extend'
    ];

    function UserFactory(
        ChaffersModel,
        extend
    ) {

        function User() {
            this.callSuper('constructor');
        }
        extend(User, ChaffersModel);

        // Django fields
        User.createDjangoField('username');

        // Functions
        User.prototype.getUsername = getUsername;

        return User;
        // STOP! Functions only past this point alright.

        /**
         * Return the user's username
         * @returns {string}
         */
        function getUsername() {
            return this.username;
        }

    }

})();
