
    /**
     * Directive handler for the Character Sheet
     * @returns {Object} the directive objects for a character sheet
     */
    export default function characterLinkFromData() {

        var directive = {
            restrict: 'E',
            scope: {
                characterData: '='
            },
            controller: ['createPopulatedInstance', 'Character', controller],
            controllerAs: 'characterLinkFromDataVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/character_link/from_data/character_link.html'
        };

        return directive;

        function controller(createPopulatedInstance, Character) {
            this.character = createPopulatedInstance(Character, this.characterData);
        }

    }