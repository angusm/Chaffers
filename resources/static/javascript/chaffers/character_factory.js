(function() {

    angular.module('chaffers').factory('Character', [
        'Specialty',
        'Flaw',
        'BaseModel',
        'relationManager',
        'extend',
        CharacterFactory
    ]);

    function CharacterFactory(
        Specialty,
        Flaw,
        BaseModel,
        relationManager,
        extend
    ) {

        function Character() {
            BaseModel.apply(this, arguments);
        }
        extend(Character, BaseModel);

        // Properties
        Character.prototype.specialties = undefined;
        Character.prototype.flaws = undefined;

        // Functions
        Character.prototype.getFlaws = getFlaws;
        Character.prototype.getSpecialties = getSpecialties;

        // Register relations
        relationManager.registerHasManyRelation(Character, 'flaws', Flaw);
        relationManager.registerHasManyRelation(Character, 'specialties', Specialty);

        return Character;

        // STOP! Only functions past here.

        function getFlaws() {
            return this.flaws;
        }

        function getSpecialties() {
            return this.specialties;
        }

    }

})();
