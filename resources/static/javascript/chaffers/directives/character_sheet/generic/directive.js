(function (){
    angular.module('chaffers').directive('characterSheet', characterSheet);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for the Character Sheet
     * @returns {object} the directive objects for a character sheet
     */
    function characterSheet() {

        var directive = {
            restrict: 'E',
            scope: {
                character: '='
            },
            controller: CharacterSheetController,
            controllerAs: 'characterSheetVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_sheet/generic/character_sheet.html'
        };

        /**
         * Give the Character sheet controller what it needs
         * @type {string[]}
         */
        CharacterSheetController.$inject = [
            'AbilityDataService'
        ];
        CharacterSheetController.prototype.setAbilities = setAbilities;

        return directive;

        function CharacterSheetController(
            AbilityDataService
        ) {
            AbilityDataService.getAllAbilities().then(
                this.setAbilities.bind(this)
            );
        }

        /**
         * Set the abilities on the controller to the given set
         */
        function setAbilities(newAbilities) {
            console.log(newAbilities);
            this.abilities = newAbilities;
        }

    }
})();