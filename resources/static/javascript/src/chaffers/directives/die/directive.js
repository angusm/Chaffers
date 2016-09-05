

    // Constants


    // Functions
    DieController.prototype.getCSSClass = getCSSClass;
    export default DieDirective;


    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function DieDirective() {

        var directive = {
            restrict: 'E',
            scope: {
                die: '='
            },
            controller: DieController,
            controllerAs: 'dieVM',
            bindToController: true,
            templateUrl: '/static/javascript/src/chaffers/directives/die/die.html'
        };

        return directive;

    }

    function DieController() {}

    /**
     * Returns a CSS class used to style the die based on its value.
     * @returns {string} The CSS class used to style the die.
     */
    function getCSSClass() {
        return 'die-display-' + this.die.getValue();
    }
    