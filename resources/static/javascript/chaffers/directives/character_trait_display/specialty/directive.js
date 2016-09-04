(() => {
    angular.module('chaffers').directive('specialty', specialty);

    /**
     * Directive generator for display a Specialty
     * @returns {Object} The directive object for displaying a specialty
     */
    function specialty() {
        var directive = {
            restrict: 'E',
            scope: {
                specialty: '='
            },
            templateUrl: '/static/javascript/chaffers/directives/character_trait_display/specialty/specialty.html',
            controller: function() {},
            controllerAs: 'specialtyVM',
            bindToController: true
        };

        return directive;
    }
})();