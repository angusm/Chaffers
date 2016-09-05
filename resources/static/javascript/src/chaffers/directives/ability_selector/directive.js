

// Inject
AbilitySelectorController.$inject = [
    'Ability'
];

// Functions
AbilitySelectorController.prototype.setAbilities = setAbilities;

/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
export default function AbilitySelector() {
    return {
        restrict: 'E',
        scope: {
            selectedAbilities: '='
        },
        controller: AbilitySelectorController,
        controllerAs: 'abilitySelectorVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/ability_selector/ability_selector.html'
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
