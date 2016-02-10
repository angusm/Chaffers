(function () {
    angular.module('chaffers').directive('abilityModifier', abilityModifier);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for an ability modifier
     * @returns {object} the directive object for an ability modifier
     */
    function abilityModifier() {

        var directive = {
            restrict: 'E',
            scope: {
                abilityModifier: '='
            },
            controller: function () {
            },
            controllerAs: 'abilityModifierVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/ability_modifier_display/ability_modifier.html'
        };

        return directive;

    }
})();