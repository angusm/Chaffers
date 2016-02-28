(function () {

    angular.module('chaffers').factory('CheckContext', CheckContextFactory);

    CheckContextFactory.$inject = [
        'BaseModel',
        'extend',
        'relationManager',
        'AbilityModifier'
    ];

    function CheckContextFactory(BaseModel,
                                 extend,
                                 relationManager,
                                 AbilityModifier) {

        function CheckContext() {

            this.id = undefined;
            this.description = undefined;
            this.abilityModifiers = undefined;
            this.displayName = undefined;
            this.parent = undefined;

            BaseModel.apply(this, arguments);
        }

        extend(CheckContext, BaseModel);

        // Relations
        relationManager.registerHasManyRelation(CheckContext, 'abilityModifiers', AbilityModifier);

        // Functions

        return CheckContext;
        // STOP! Functions only past this point alright.

    }

})();