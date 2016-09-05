import Position2d from '../../../handies/structs/geometry/position_2d';
import implement from '../../../backend_models/implement';

GameBoardPositionFactory.$inject = ['ChaffersModel'];
export default GameBoardPositionFactory;

function GameBoardPositionFactory(
    ChaffersModel
) {
    /**
     * Class to contain Character Trait data and functionality
     * @constructor
     */
    class GameBoardPosition extends ChaffersModel {
        static getDjangoModelName() {return 'GameBoardPosition';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'x',
                'y',
            ]
        }
    }
    implement(GameBoardPosition, Position2d);

    return GameBoardPosition;
}
