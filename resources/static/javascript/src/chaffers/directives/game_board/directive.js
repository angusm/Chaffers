import thrashKilledMouse from '../../../thrash_killer/thrash_killed_mouse';
import thrashKiller from '../../../thrash_killer/thrash_killer';

gameBoardDirective.$inject = [
    'Position2d',
];
export default gameBoardDirective;

/**
 * Directive handler for ...
 * @returns {Object} the directive object for ...
 */
function gameBoardDirective(
    Position2d,
) {

    return {
        restrict: 'E',
        scope: {
            gameBoardId: '='
        },
        controller: ['$element', 'djangoHTTP', GameBoardController],
        controllerAs: 'gameBoardVM',
        bindToController: true,
        templateUrl: '/static/javascript/src/chaffers/directives/game_board/game_board.html'
    };

    /**
     * Controller for the character ability directive
     * @constructor
     */
    class GameBoardController {
        constructor($element, djangoHTTP) {
            this.ngElement = $element;
            this.djangoHTTP = djangoHTTP;
            this.position = new Position2d(0, 0);
            this.scale = 1.0;
            this.tiles = [];
            this.tileSize = 75;
            this.height = undefined;
            this.width = undefined;
            thrashKiller.preRender(() => {this.queryDOM()});
            thrashKiller.render(() => {this.updateDOM()});
            thrashKilledMouse.onMouseDrag((dragVector) => {
                this.handleDrag(dragVector);
            });
        }

        getPosition() {
            return this.position;
        }

        queryDOM() {
            this.height = jQuery(this.getElement()).height();
            this.width = jQuery(this.getElement()).width();
        }

        /**
         * Return the tiles displayed on the board.
         * @returns {Array} Tiles displayed on the board.
         */
        getTiles() {
            return this.tiles;
        }

        /**
         * Returns the current tile size in pixels.
         * @returns {number} Current tile size in pixels.
         */
        getTileSize() {
            return this.tileSize * this.getScale();
        }

        /**
         * Return the scale of the current game board.
         * @returns {number} Scale of the game board.
         */
        getScale() {
            return this.scale;
        }

        /**
         * Returns the element attached to the directive.
         * @returns {HTMLElement}
         */
        getElement() {
            return this.ngElement;
        }

        /**
         * Returns the tile container.
         * @returns {HTMLElement} The tile container.
         */
        getTileContainer() {
            return jQuery(this.getElement()).children('.tile-container').first();
        }

        getWidth() {
            return this.width;
        }

        getHeight() {
            return this.height;
        }

        handleDrag(dragVector) {
            super.handleDrag([dragVector]);
            this.setPosition(
                this.getPosition().translate(dragVector)
            );
        }

        /**
         * Create or remove tiles so that the necessary amount is available.
         * Then position and resize the tiles.
         */
        layoutTiles() {
            this.generateTileSet();
            this.updateTiles();
        }

        /**
         * Update the position and sizing of the tiles on the game board
         */
        updateTiles() {
            var tileIndex = 0;
            for (var x = -1; x <= this.getTilesWide(); x++) {
                for (var y = -1; y <= this.getTilesHigh(); y++) {
                    this.updateTile(
                        this.getTiles()[tileIndex],
                        new Position2d(x, y)
                    );
                    tileIndex++;
                }
            }
        }

        /**
         * Generate a tile set that will cover the tiles container.
         */
        generateTileSet() {
            this.removeExtraTiles();
            this.generateMissingTiles();
        }

        /**
         * Remove any extra tiles from the DOM
         */
        removeExtraTiles() {
            var tileCount = this.getTilesCount();
            var tiles = this.getTiles();
            while (tiles.length > tileCount) {
                var extraTile = tiles.pop();
                jQuery(extraTile).remove();
            }
        }

        /**
         * Add any missing tiles to the DOM
         */
        generateMissingTiles() {
            var tileCount = this.getTilesCount();
            while (this.tiles.length < tileCount) {
                this.tiles.push(this.generateTile());
            }
        }

        generateTile() {
            var newTile = jQuery('<div class="tile"></div>');
            jQuery(this.getTileContainer()).append(newTile);
            return newTile;
        }

        getTilesCount() {
            return (this.getTilesWide() + 2) * (this.getTilesHigh() + 2);
        }

        getTilesWide() {
            return Math.ceil(this.getWidth() / this.getTileSize());
        }

        getTilesHigh() {
            return Math.ceil(this.getHeight() / this.getTileSize());
        }

        /**
         * Updates the DOM based on user interactions.
         */
        updateDOM() {
            this.layoutTiles();
            this.translateTileContainer();
            this.getTileOffset();
        }

        /**
         * Return the offset of the 0,0 tile in the display.
         * @returns {*}
         */
        getTileOffset() {
            var position = this.getPosition();
            var xOffset = -Math.floor(position.getX() / this.getTileSize());
            var yOffset = -Math.floor(position.getY() / this.getTileSize());
            return new Position2d(xOffset, yOffset);
        }

        translateTileContainer() {
            var offset = this.getTileTranslationOffset();
            var container = this.getTileContainer();
            var x = offset.getX();
            var y = offset.getY();
            jQuery(container).css({
                'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)'
            });
        }

        /**
         * Translate the given tile to the given X and Y position
         * @param tile
         * @param tilePosition
         */
        updateTile(tile, tilePosition) {

            var translationPosition = this.getTileTranslation(tilePosition);
            var x = translationPosition.getX();
            var y = translationPosition.getY();

            jQuery(tile).css({
                'height': this.getTileSize() + 'px',
                'width': this.getTileSize() + 'px',
                'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)'
            });
        }

        getTileTranslation(tilePosition) {
            return tilePosition.scale(this.getTileSize());
        }

        getTileTranslationOffset() {
            return this.getPosition().modulo(
                this.getTileSize()
            );
        }

        setPosition(newPosition) {
            this.position = newPosition;
        }
    }

}
