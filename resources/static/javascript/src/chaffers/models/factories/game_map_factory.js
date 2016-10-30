GameMapFactory.$inject = [
    'ChaffersModel',
    'Game',
];
export default GameMapFactory;

function GameMapFactory(
    ChaffersModel,
    Game
) {
    return class GameMap extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasOneField('game', 'chaffers', 'Game');
        }

        static getModelName() {return 'GameMap';}
    }
}
