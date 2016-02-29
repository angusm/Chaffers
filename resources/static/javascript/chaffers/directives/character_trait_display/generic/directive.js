(function() {
    angular.module('chaffers').directive('characterTrait', characterTrait);

    /**
     * Directive generator for a Character Trait display block
     * @returns {object} The directive object for displaying a character trait
     */
    function characterTrait() {

        var directive = {
            restrict: 'E',
            scope: {
                characterTrait: '='
            },
            templateUrl: '/static/javascript/chaffers/directives/character_trait_display/generic/character_trait.html',
            controller: function() {
                this.popoverTemplateUrl = '/static/javascript/chaffers/directives/character_trait_display/generic/character_trait_popover.html';
            },
            controllerAs: 'characterTraitVM',
            bindToController: true
        };

        return directive;

    }
})();