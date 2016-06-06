(function() {

    angular.module('chaffers').factory('GameCharacter', [
        'Character',
        'Game',
        'relationManager',
        'extend',
        GameCharacterFactory
    ]);

    function GameCharacterFactory(
        Character,
        Game,
        relationManager,
        extend
    ) {

        function GameCharacter() {
            this.callSuper('constructor');
        }
        extend(GameCharacter, Character);

        // Django Fields
        GameCharacter.createDjangoField('game');
        GameCharacter.createDjangoField('position');

        // Register Relations
        relationManager.registerHasManyRelation(GameCharacter, 'game', Game);
        relationManager.registerHasManyRelation(GameCharacter, 'position', Game);

        return GameCharacter;

        // STOP! Only functions past here.

    }

})();
