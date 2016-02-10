(function() {

    angular.module('chaffers').factory('Ability', AbilityFactory);

    AbilityFactory.$inject = [
        'BaseModel',
        'extend',
        'TextBlock',
        'relationManager'
    ];

    function AbilityFactory(
        BaseModel,
        extend,
        TextBlock,
        relationManager
    ) {

        function Ability() {

            this.id = undefined;
            this.displayName = undefined;
            this.description = undefined;

            BaseModel.apply(this, arguments);
        }
        extend(Ability, BaseModel);

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
