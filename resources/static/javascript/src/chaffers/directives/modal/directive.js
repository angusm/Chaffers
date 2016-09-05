
    /**
     * Directive generator for a Character Trait display block
     * @returns {Object} The directive object for displaying a character trait
     */
    export default function modal() {
        var directive = {
            restrict: 'E',
            scope: {
                template: '='
            },
            templateUrl: '/static/javascript/src/chaffers/directives/modal/modal.html',
            controller: ModalController,
            controllerAs: 'modalVM',
            bindToController: true
        };

        function ModalController() {}

        return directive;
        // STOP! Functions only past this point.
    }