(function () {

    "use strict";

    angular.module('chaffers').directive('checkContextSelector', CheckContextSelector);

    // Inject
    CheckContextSelectorController.$inject = [
        'CheckContextDataService'
    ];

    // Functions
    CheckContextSelectorController.prototype.setCheckContexts = setCheckContexts;

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function CheckContextSelector() {

        var directive = {
            restrict: 'E',
            scope: {
                selectedCheckContexts: '='
            },
            controller: CheckContextSelectorController,
            controllerAs: 'checkContextSelectorVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/check_context_selector/check_context_selector.html'
        };

        return directive;

    }

    /**
     * Controller for the check contexts selector
     * @param CheckContextDataService
     * @constructor
     */
    function CheckContextSelectorController(
        CheckContextDataService
    ) {
        CheckContextDataService.getAllCheckContexts().then(
            this.setCheckContexts.bind(this)
        );
    }

    /**
     * Set the check contexts
     * @param newCheckContexts
     */
    function setCheckContexts(newCheckContexts) {
        this.checkContexts = newCheckContexts;
    }

})();