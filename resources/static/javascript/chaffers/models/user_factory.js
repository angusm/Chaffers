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
            ChaffersModel.apply(this);

            createDjangoField(this, 'username');
        }
        extend(User, ChaffersModel);

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
