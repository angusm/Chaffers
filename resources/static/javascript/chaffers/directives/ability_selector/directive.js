(() => {

    "use strict";

    angular.module('chaffers').directive('abilitySelector', AbilitySelector);

    // Inject
    AbilitySelectorController.$inject = [
        'Ability'
    ];

    // Functions
    AbilitySelectorController.prototype.setAbilities = setAbilities;

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function AbilitySelector() {
        return {
            restrict: 'E',
            scope: {
                selectedAbilities: '='
            },
            controller: AbilitySelectorController,
            controllerAs: 'abilitySelectorVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/ability_selector/ability_selector.html'
        };
    }

    /**
     * Controller for the ability selector
     * @param Ability
     * @constructor
     */
    function AbilitySelectorController(
        Ability
    ) {
        Ability.getAll().then(
            this.setAbilities.bind(this)
        );
    }

    /**
     * Set the abilities
     * @param newAbilities
     */
    function setAbilities(newAbilities) {
        this.abilities = newAbilities;
    }

})();