(function() {

    angular.module('chaffers').directive('flaw', flaw);

    /**
     * Generates a directive object for displaying a flaw
     * @returns {object} Directive object for displaying a flaw
     */
    function flaw() {
        var directive = {
            restrict: 'E',
            scope: {
                flaw: '='
            },
            controller: function() {},
            controllerAs: 'flawVM',
            bindToController: true,
            template: '/static/character_trait_display/flaw/flaw.html'
        };

        return directive;
    }

})();
