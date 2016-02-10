(function () {
    angular.module('chaffers').directive('characterSheetFromId', characterSheetFromId);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for a character sheet created from a character ID
     * @returns {object} the directive object for a character sheet
     */
    function characterSheetFromId() {

        var directive = {
            restrict: 'E',
            scope: {
                characterId: '='
            },
            controller: characterSheetFromIdController,
            controllerAs: 'characterSheetFromIdVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/character_sheet/from_id/character_sheet_from_id.html'
        };

        characterSheetFromIdController.$inject(
            'CharacterSheetDataService'
        );

        function characterSheetFromIdController(
            CharacterSheetDataService
        ) {
            var vm = this;
            CharacterSheetDataService.getCharacterByID(this.characterId).then(setCharacter);
            function setCharacter(character) {
                vm.character = character;
            }
        };

        return directive;

    }
})();