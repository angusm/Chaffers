(function() {

    angular.module('chaffers').factory('User', UserFactory);

    UserFactory.$inject = [
        'BaseModel',
        'extend',
        'relationManager'
    ];

    function UserFactory(
        BaseModel,
        extend,
        relationManager
    ) {

        function User() {

            this.id = undefined;
            this.username = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(User, BaseModel);

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
