GameMapFactory.$inject = [
    'ChaffersModel',
    'Game',
];
let GameMap;
export default GameMapFactory;

function GameMapFactory(
    ChaffersModel,
    Game
) {
    GameMap = GameMap || class GameMap extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasOneField('game', 'chaffers', 'Game');
        }

        static getModelName() {return 'GameMap';}
    };
    return GameMap;
}
