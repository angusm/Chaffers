(() => {
    angular.module('chaffers').directive('characterSheetFromId', characterSheetFromId);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for a character sheet created from a character ID
     * @returns {Object} the directive object for a character sheet
     */
    function characterSheetFromId() {

        var directive = {
            restrict: 'E',
            scope: {
                characterId: '='
            },
            controller: CharacterSheetFromIdController,
            controllerAs: 'characterSheetFromIdVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_sheet/from_id/character_sheet_from_id.html'
        };

        CharacterSheetFromIdController.$inject = [
            'Character'
        ];

        function CharacterSheetFromIdController(
            Character
        ) {
            createPopulatedDjangoModel(Character, this.characterId).then(setCharacter.bind(this));
        }

        CharacterSheetFromIdController.prototype.setCharacter = setCharacter;

        return directive;

        // Functions past here...
        function setCharacter(character) {
            this.character = character;
        }

    }
})();