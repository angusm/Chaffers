    /**
     * Directive handler for the Character Sheet
     * @returns {Object} the directive objects for a character sheet
     */
    export default function characterSheetFromData() {

        var directive = {
            restrict: 'E',
            scope: {
                characterData: '='
            },
            controller: ['createPopulatedInstance', 'Character', controller],
            controllerAs: 'characterSheetFromDataVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/character_sheet/from_data/character_sheet_from_data.html'
        };

        return directive;

        function controller(createPopulatedInstance, Character) {
            this.character = createPopulatedInstance(Character, this.characterData);
        }

    }