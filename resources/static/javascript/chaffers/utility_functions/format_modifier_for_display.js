(() => {

    "use strict";

    angular.module('chaffers').factory('formatModifierForDisplay', formatModifierForDisplayFactory);

    formatModifierForDisplayFactory.$inject = [];

    function formatModifierForDisplayFactory() {
        return formatModifierForDisplay;

        /**
         * Format a modifier for display
         */
        function formatModifierForDisplay(modifier) {
            if (modifier > 0) {
                return '+' + modifier;
            }
            else {
                return String(modifier);
            }
        }
    }

})();
