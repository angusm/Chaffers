(function () {

    "use strict";

    angular.module('chaffers').directive('attribute', attributeDirective);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {object} the directive object for ...
     */
    function attributeDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                attribute: '='
            },
            controller: function () {
            },
            controllerAs: 'attributeVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/attribute/attribute.html'
        };

        return directive;

    }
})();