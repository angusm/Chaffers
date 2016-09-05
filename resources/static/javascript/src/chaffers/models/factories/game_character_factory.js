GameCharacterFactory.$inject =[
    'Character',
    'Game',
    'GameBoardPosition',
];
export default GameCharacterFactory;

function GameCharacterFactory(
    Character,
    Game,
    GameBoardPosition,
) {
    return class GameCharacter extends Character{
        static getDjangoModelName() {return 'GameCharacter';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'game',
                'position'
            ];
        }

        static getHasManyRelations() {
            return super.getHasManyRelations().
                set('game', Game).
                set('position', GameBoardPosition)
        }
    };
}
