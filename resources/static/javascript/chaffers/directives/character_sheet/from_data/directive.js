(function (){

    angular.module('chaffers').directive('characterSheetFromData', [
        characterSheetFromData
    ]);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for the Character Sheet
     * @returns {object} the directive objects for a character sheet
     */
    function characterSheetFromData() {

        var directive = {
            restrict: 'E',
            scope: {
                characterData: '='
            },
            controller: ['createPopulatedInstance', 'Character', controller],
            controllerAs: 'characterSheetFromDataVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_sheet/from_data/character_sheet_from_data.html'
        };

        return directive;

        function controller(createPopulatedInstance, Character) {
            this.character = createPopulatedInstance(Character, this.characterData);
        }

    }
})();