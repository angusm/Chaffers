
    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    export default function attributeDirective() {
        var directive = {
            restrict: 'E',
            scope: {
                attribute: '='
            },
            controller: function () {
            },
            controllerAs: 'attributeVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/attribute/attribute.html'
        };

        return directive;
    }