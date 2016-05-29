(function () {

    "use strict";

    angular.module('chaffers').directive('playerPanel', playerPanelDirective);

    playerPanelDirective.$inject = [
        'createPopulatedInstance',
        'Player'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function playerPanelDirective(
        createPopulatedInstance,
        Player
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                playerData: '='
            },
            controller: ['djangoHTTP', PlayerPanelController],
            controllerAs: 'playerPanelVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/player_panel/player_panel.html'
        };


        /**
         * Controller for the character ability directive
         * @constructor
         */
        function PlayerPanelController(
            djangoHTTP
        ) {
            this.player = undefined;
            this.password = undefined;
            this.username = undefined;
            this.djangoHTTP = djangoHTTP;
        }

        // Functions
        PlayerPanelController.prototype.getPlayer = getPlayer;
        PlayerPanelController.prototype.login = login;
        PlayerPanelController.prototype.logout = logout;
        PlayerPanelController.prototype.isPlayerLoggedIn = isPlayerLoggedIn;

        return directive;
        // STOP! Nothing but functions past this point

        /**
         * Return the currently logged in player
         * @returns {Player|*}
         */
        function getPlayer() {
            if (typeof this.player === 'undefined' && typeof this.playerData === 'object') {
                this.player = createPopulatedInstance(Player, this.playerData);
            }
            return this.player;
        }

        function isPlayerLoggedIn() {
            return typeof this.getPlayer() !== 'undefined';
        }

        function clearInput() {
            this.username = undefined;
            this.password = undefined;
        }

        function login() {
            var ctrl = this;
            this.djangoHTTP.post(
                '/players/login',
                {
                    username: this.username,
                    password: this.password
                }
            ).then(function(res) {
                ctrl.player = undefined;
                ctrl.playerData = res.data.player_data;
                ctrl.clearInput();
            });
        }

        function logout() {
            var ctrl = this;
            this.djangoHTTP.post(
                '/players/logout'
            ).then(function(res) {
                ctrl.player = undefined;
                ctrl.playerData = undefined;
                ctrl.clearInput();
            });
        }

    }
})();