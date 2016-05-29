(function () {

    "use strict";

    angular.module('chaffers').controller('loginController', [
        'djangoHTTP',
        LoginController
    ]);

    // Functions
    LoginController.prototype.login = login;
    LoginController.prototype.logout = logout;

    // STOP! Nothing but functions past this point ya hear?
    return;

    function LoginController(djangoHTTP) {
        this.username = '';
        this.password = '';
        this.djangoHTTP = djangoHTTP;
    }

    function login() {
        this.djangoHTTP.post(
            '/players/login',
            {
                username: this.username,
                password: this.password
            }
        ).then(function(res) {
            console.log(res);
        });
    }

    function logout() {
        this.djangoHTTP.post('/players/logout').then(function(res) {
            console.log(res);
        });
    }

})();