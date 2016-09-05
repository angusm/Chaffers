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
        static getDjangoModelName() {return 'GameMap';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'game',
            ];
        }

        static getHasOneRelations() {
            return super.getHasOneRelations().
                set('game', Game);
        }
    }
}
