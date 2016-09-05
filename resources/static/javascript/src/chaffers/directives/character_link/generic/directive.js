
    /**
     * Directive handler for a link to a character sheet
     * @returns {Object} the directive object for a character link
     */
    export default function characterLink() {

        var directive = {
            restrict: 'E',
            scope: {
                character: '='
            },
            controller: function(){},
            controllerAs: 'characterLinkVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/character_link/generic/character_link.html'
        };

        return directive;

    }