GameCharacterFactory.$inject =[
    'Character',
    'Game',
    'GameBoardPosition',
];
let GameCharacter;
export default GameCharacterFactory;

function GameCharacterFactory(
    Character,
    Game,
    GameBoardPosition,
) {
    GameCharacter = GameCharacter || class GameCharacter extends Character{
        constructor(id) {
            super(id);
            this.createHasOneField('game', 'chaffers', 'Game');
            this.createHasOneField('position', 'chaffers', 'GameBoardPosition');
        }

        static getModelName() {return 'GameCharacter';}
    };
    return GameCharacter;
}
