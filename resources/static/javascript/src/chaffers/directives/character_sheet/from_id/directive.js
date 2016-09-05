
    /**
     * Directive handler for a character sheet created from a character ID
     * @returns {Object} the directive object for a character sheet
     */
    export default function characterSheetFromId() {

        var directive = {
            restrict: 'E',
            scope: {
                characterId: '='
            },
            controller: CharacterSheetFromIdController,
            controllerAs: 'characterSheetFromIdVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/character_sheet/from_id/character_sheet_from_id.html'
        };

        CharacterSheetFromIdController.$inject = [
            'Character',
            'createPopulatedDjangoModel',
        ];

        function CharacterSheetFromIdController(
            Character,
            createPopulatedDjangoModel
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