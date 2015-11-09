(function() {
    angular.module('chaffers').directive('specialty', specialty);

    /**
     * Directive generator for display a Specialty
     * @returns {object} The directive object for displaying a specialty
     */
    function specialty() {
        var directive = {
            restrict: 'E',
            scope: {
                specialty: '='
            },
            templateUrl: '/static/javascript/chaffers/character_trait_display/specialty/specialty.html'
        };

        return directive;
    }
})();