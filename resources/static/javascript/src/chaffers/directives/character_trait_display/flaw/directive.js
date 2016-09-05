
    /**
     * Generates a directive object for displaying a flaw
     * @returns {Object} Directive object for displaying a flaw
     */
    export default function flaw() {
        var directive = {
            restrict: 'E',
            scope: {
                flaw: '='
            },
            controller: function() {},
            controllerAs: 'flawVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/character_trait_display/flaw/flaw.html'
        };

        return directive;
    }
