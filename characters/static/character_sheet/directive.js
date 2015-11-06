angular.module('chaffers').directive('characterSheet', characterSheet);

function characterSheet() {

    var directive = {
        link: link,
        templateUrl: '/static/character_sheet/character_sheet.html'
    };

    return directive;

    /**
     * Functions
     */

    function link(scope, element, attrs) {}

}