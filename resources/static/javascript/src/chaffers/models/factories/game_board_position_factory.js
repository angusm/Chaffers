import Position2d from '../../../handies/structs/geometry/position_2d';
import implement from '../../../djangular/implement';

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
        constructor(id) {
            super(id);
            this.createNumberField('x');
            this.createNumberField('y');
        }

        static getModelName() {return 'GameBoardPosition';}
    }
    implement(GameBoardPosition, Position2d);

    return GameBoardPosition;
}
