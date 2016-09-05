/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
export default function characterAttributeDirective() {

    var directive = {
        restrict: 'E',
        scope: {
            character: '=',
            attribute: '='
        },
        controller: CharacterAttributeDirectiveController,
        controllerAs: 'characterAttributeVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/character_attribute/character_attribute.html'
    };


    /**
     * Controller for the character attribute directive
     * @constructor
     */
    function CharacterAttributeDirectiveController() {
    }
    CharacterAttributeDirectiveController.prototype.getModifiedAttributeValue = getModifiedAttributeValue;

    return directive;
    // STOP! Nothing but functions past this point

    /**
     * Return the modifier for display in the directive
     * @returns {*}
     */
    function getModifiedAttributeValue() {

        // Return blank if the character or attribute are not properly set up yet
        if (!this.character || !this.attribute.id) {
            return '';
        }

        return this.character.getModifiedAttributeValue(this.attribute);
    }

}