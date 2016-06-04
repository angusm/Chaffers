(function() {

    angular.module('chaffers').factory('Ability', AbilityFactory);

    AbilityFactory.$inject = [
        'ChaffersModel',
        'extend',
        'TextBlock',
        'relationManager'
    ];

    function AbilityFactory(
        ChaffersModel,
        extend,
        TextBlock,
        relationManager
    ) {

        function Ability() {
            this.callSuper('constructor');
        }
        extend(Ability, ChaffersModel);

        // Django fields
        Ability.createDjangoField('displayName');
        Ability.createDjangoField('description');

        // Relations
        relationManager.registerHasOneRelation(Ability, 'description', TextBlock);

        // Functions
        Ability.prototype.getDescription = getDescription;
        Ability.prototype.getDisplayName = getDisplayName;

        return Ability;
        // STOP! Functions only past this point alright.

        /**
         * Return the description of the ability
         * @returns {string}
         */
        function getDescription() {
            return this.description.formattedText;
        }

        /**
         * Return the display name for the ability modifier
         * @returns {string}
         */
        function getDisplayName() {
            return this.displayName;
        }

    }

})();
