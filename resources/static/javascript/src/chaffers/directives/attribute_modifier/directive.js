
    /**
     * Directive handler for an attribute modifier
     * @returns {Object} the directive object for an attribute modifier
     */
    export default function attributeModifier() {

        return {
            restrict: 'E',
            scope: {
                attributeModifier: '='
            },
            controller: function () {
            },
            controllerAs: 'attributeModifierVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/attribute_modifier_display/attribute_modifier.html'
        };
    }