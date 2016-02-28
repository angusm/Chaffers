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
            'AbilityDataService',
            'AttributeDataService'
        ];
        CharacterSheetController.prototype.setAbilities = setAbilities;
        CharacterSheetController.prototype.setAttributes = setAttributes;

        return directive;

        function CharacterSheetController(
            AbilityDataService,
            AttributeDataService
        ) {
            this.selectedCheckContexts = [];
            AbilityDataService.getAllAbilities().then(
                this.setAbilities.bind(this)
            );

            AttributeDataService.getAllAttributes().then(
                this.setAttributes.bind(this)
            );
        }

        /**
         * Set the abilities on the controller to the given set
         * @param newAbilities
         */
        function setAbilities(newAbilities) {
            this.abilities = newAbilities;
        }

        /**
         * Set the attributes on the controller to the given set
         * @param newAttributes
         */
        function setAttributes(newAttributes) {
            this.attributes = newAttributes;
        }
    }
})();