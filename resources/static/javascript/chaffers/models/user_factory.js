(function() {

    angular.module('chaffers').factory('User', UserFactory);

    UserFactory.$inject = [
        'ChaffersModel',
        'extend',
        'createDjangoField'
    ];

    function UserFactory(
        ChaffersModel,
        extend,
        createDjangoField
    ) {

        function User() {
            this.callSuper('constructor');
        }
        extend(User, ChaffersModel);

        // Django fields
        createDjangoField(User, 'username');

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
