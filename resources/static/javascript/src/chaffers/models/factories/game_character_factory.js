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
        constructor(id) {
            super(id);
            this.createHasOneField('game', 'chaffers', 'Game');
            this.createHasOneField('position', 'chaffers', 'GameBoardPosition');
        }

        static getModelName() {return 'GameCharacter';}
    };
}
