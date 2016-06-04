(function() {

    angular.module('chaffers').factory('Ability', AbilityFactory);

    AbilityFactory.$inject = [
        'ChaffersModel',
        'extend',
        'TextBlock',
        'relationManager',
        'createDjangoField'
    ];

    function AbilityFactory(
        ChaffersModel,
        extend,
        TextBlock,
        relationManager,
        createDjangoField
    ) {

        function Ability() {
            this.callSuper('constructor');

            createDjangoField(this, 'displayName');
            createDjangoField(this, 'description');
        }
        extend(Ability, ChaffersModel);

        // Relations
        relationManager.registerHasOneRelation(Ability, 'description', TextBlock);

        // Functions
        Ability.prototype.getDisplayName = getDisplayName;
        Ability.prototype.getDescription = getDescription;

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
