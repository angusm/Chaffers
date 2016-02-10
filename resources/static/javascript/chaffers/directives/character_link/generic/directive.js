(function (){
    angular.module('chaffers').directive('characterLink', characterLink);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for a link to a character sheet
     * @returns {object} the directive object for a character link
     */
    function characterLink() {

        var directive = {
            restrict: 'E',
            scope: {
                character: '='
            },
            controller: function(){},
            controllerAs: 'characterLinkVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_link/generic/character_link.html'
        };

        return directive;

    }
})();