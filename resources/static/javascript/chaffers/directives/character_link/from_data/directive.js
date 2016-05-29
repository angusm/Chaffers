(function (){

    angular.module('chaffers').directive('characterLinkFromData', [
        characterLinkFromData
    ]);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for the Character Sheet
     * @returns {Object} the directive objects for a character sheet
     */
    function characterLinkFromData() {

        var directive = {
            restrict: 'E',
            scope: {
                characterData: '='
            },
            controller: ['createPopulatedInstance', 'Character', controller],
            controllerAs: 'characterLinkFromDataVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/character_link/from_data/character_link.html'
        };

        return directive;

        function controller(createPopulatedInstance, Character) {
            this.character = createPopulatedInstance(Character, this.characterData);
        }

    }
})();