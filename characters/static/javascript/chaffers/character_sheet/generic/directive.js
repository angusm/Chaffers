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
                character: '=',
                abilities: '='
            },
            controller: function(){},
            controllerAs: 'characterSheetVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/character_sheet/generic/character_sheet.html'
        };

        return directive;

    }
})();