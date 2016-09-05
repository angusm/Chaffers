
    /**
     * Directive generator for a Character Trait display block
     * @returns {Object} The directive object for displaying a character trait
     */
    export default function characterTrait() {
        var directive = {
            restrict: 'E',
            scope: {
                characterTrait: '='
            },
            templateUrl: '/static/javascript/src/chaffers/directives/character_trait_display/generic/character_trait.html',
            controller: CharacterTraitController,
            controllerAs: 'characterTraitVM',
            bindToController: true
        };

        function CharacterTraitController() {}

        return directive;
        // STOP! Functions only past this point.
    }