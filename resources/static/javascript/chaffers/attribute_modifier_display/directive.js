(function () {
    angular.module('chaffers').directive('attributeModifier', attributeModifier);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for an attribute modifier
     * @returns {object} the directive object for an attribute modifier
     */
    function attributeModifier() {

        var directive = {
            restrict: 'E',
            scope: {
                attributeModifier: '='
            },
            controller: function () {
            },
            controllerAs: 'attributeModifierVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/attribute_modifier_display/attribute_modifier.html'
        };

        return directive;

    }
})();