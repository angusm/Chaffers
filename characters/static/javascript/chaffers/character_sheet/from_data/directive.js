(function (){

    angular.module('chaffers').directive('characterSheetFromData', [
        '$injector',
        characterSheetFromData
    ]);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for the Character Sheet
     * @returns {object} the directive objects for a character sheet
     */
    function characterSheetFromData($injector) {

        var directive = {
            scope: {
                characterData: '='
            },
            controller: ['$scope', 'createPopulatedInstance', 'Character', controller],
            templateUrl: '/static/javascript/chaffers/character_sheet/from_data/character_sheet.html'
        };

        return directive;

        function controller($scope, createPopulatedInstance, Character) {

            window.$scope = $scope;
            $scope.character = createPopulatedInstance(Character, $scope.characterData);

        }

    }
})();