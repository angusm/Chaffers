/**
 * Directive handler for the Character Sheet
 * @returns {Object} the directive objects for a character sheet
 */
export default function characterSheet() {

    var directive = {
        restrict: 'E',
        scope: {
            character: '='
        },
        controller: CharacterSheetController,
        controllerAs: 'characterSheetVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/character_sheet/generic/character_sheet.html'
    };

    /**
     * Give the Character sheet controller what it needs
     * @type {string[]}
     */
    CharacterSheetController.$inject = [
        'Ability',
        'Attribute'
    ];
    CharacterSheetController.prototype.getSelectedAbilities = getSelectedAbilities;
    CharacterSheetController.prototype.getSelectedCheckContexts = getSelectedCheckContexts;
    CharacterSheetController.prototype.setAbilities = setAbilities;
    CharacterSheetController.prototype.setAttributes = setAttributes;

    return directive;

    function CharacterSheetController(
        Ability,
        Attribute
    ) {
        this.selectedCheckContexts = [];
        this.selectedAbilities = [];
        Ability.getAll().then(
            this.setAbilities.bind(this)
        );

        Attribute.getAll().then(
            this.setAttributes.bind(this)
        );
    }

    /**
     * Get the selected check contexts
     */
    function getSelectedAbilities() {
        return this.selectedAbilities;
    }

    /**
     * Get the selected check contexts
     */
    function getSelectedCheckContexts() {
        return this.selectedCheckContexts;
    }

    /**
     * Set the abilities on the controller to the given set
     * @param newAbilities
     */
    function setAbilities(newAbilities) {
        this.abilities = newAbilities;
    }

    /**
     * Set the attributes on the controller to the given set
     * @param newAttributes
     */
    function setAttributes(newAttributes) {
        this.attributes = newAttributes;
    }
}