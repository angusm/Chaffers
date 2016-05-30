(function () {

    "use strict";

    angular.module('chaffers').directive('gameBoard', gameBoardDirective);

    gameBoardDirective.$inject = [
        'extend',
        'MouseUpdated',
        'Position2D',
        'getParentClass'
    ];

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for ...
     * @returns {Object} the directive object for ...
     */
    function gameBoardDirective(
        extend,
        MouseUpdated,
        Position2D,
        getParentClass
    ) {

        var directive = {
            restrict: 'E',
            scope: {
                gameBoardId: '='
            },
            controller: ['$element', 'djangoHTTP', GameBoardController],
            controllerAs: 'gameBoardVM',
            bindToController: true,
            templateUrl: '/static/javascript/chaffers/directives/game_board/game_board.html'
        };

        /**
         * Controller for the character ability directive
         * @constructor
         */
        function GameBoardController($element, djangoHTTP) {

            MouseUpdated.apply(this, [$element[0]]);

            this.ngElement = $element;
            this.djangoHTTP = djangoHTTP;
            this.position = new Position2D(0, 0);
            this.scale = 1.0;
            this.tiles = [];
            this.tileSize = 75;
            this.height = undefined;
            this.width = undefined;
        }
        extend(GameBoardController, MouseUpdated);

        GameBoardController.prototype.generateMissingTiles = generateMissingTiles;
        GameBoardController.prototype.generateTile = generateTile;
        GameBoardController.prototype.generateTileSet = generateTileSet;
        GameBoardController.prototype.getElement = getElement;
        GameBoardController.prototype.getHeight = getHeight;
        GameBoardController.prototype.getPosition = getPosition;
        GameBoardController.prototype.getScale = getScale;
        GameBoardController.prototype.getTileContainer = getTileContainer;
        GameBoardController.prototype.getTileOffset = getTileOffset;
        GameBoardController.prototype.getTiles = getTiles;
        GameBoardController.prototype.getTilesCount = getTilesCount;
        GameBoardController.prototype.getTilesHigh = getTilesHigh;
        GameBoardController.prototype.getTilesWide = getTilesWide;
        GameBoardController.prototype.getTileSize = getTileSize;
        GameBoardController.prototype.getTileTranslation = getTileTranslation;
        GameBoardController.prototype.getTileTranslationOffset = getTileTranslationOffset;
        GameBoardController.prototype.getVisibleTilesArea = getVisibleTilesArea;
        GameBoardController.prototype.getWidth = getWidth;
        GameBoardController.prototype.handleDrag = handleDrag;
        GameBoardController.prototype.layoutTiles = layoutTiles;
        GameBoardController.prototype.updateTiles = updateTiles;
        GameBoardController.prototype.queryDOM = queryDOM;
        GameBoardController.prototype.removeExtraTiles = removeExtraTiles;
        GameBoardController.prototype.setPosition = setPosition;
        GameBoardController.prototype.translateTileContainer = translateTileContainer;
        GameBoardController.prototype.updateDOM = updateDOM;
        GameBoardController.prototype.updateTile = updateTile;

        // STOP! Nothing but functions past this point
        return directive;

        function getPosition() {
            return this.position;
        }

        function queryDOM() {
            getParentClass(GameBoardController).prototype.queryDOM.apply(this);
            this.height = jQuery(this.getElement()).height();
            this.width = jQuery(this.getElement()).width();
        }

        /**
         * Return the tiles displayed on the board.
         * @returns {Array} Tiles displayed on the board.
         */
        function getTiles() {
            return this.tiles;
        }

        /**
         * Returns the current tile size in pixels.
         * @returns {number} Current tile size in pixels.
         */
        function getTileSize() {
            return this.tileSize * this.getScale();
        }

        /**
         * Return the scale of the current game board.
         * @returns {number} Scale of the game board.
         */
        function getScale() {
            return this.scale;
        }

        /**
         * Returns the element attached to the directive.
         * @returns {HTMLElement}
         */
        function getElement() {
            return this.ngElement;
        }

        /**
         * Returns the tile container.
         * @returns {HTMLElement} The tile container.
         */
        function getTileContainer() {
            return jQuery(this.getElement()).children('.tile-container').first();
        }

        function getWidth() {
            return this.width;
        }

        function getHeight() {
            return this.height;
        }

        function handleDrag(dragVector) {
            getParentClass(GameBoardController).prototype.handleDrag.apply(this, [dragVector]);
            this.setPosition(
                this.getPosition().translate(dragVector)
            );
        }

        /**
         * Create or remove tiles so that the necessary amount is available.
         * Then position and resize the tiles.
         */
        function layoutTiles() {
            this.generateTileSet();
            this.updateTiles();
        }

        /**
         * Update the position and sizing of the tiles on the game board
         */
        function updateTiles() {
            var tileIndex = 0;
            for (var x = -1; x <= this.getTilesWide(); x++) {
                for (var y = -1; y <= this.getTilesHigh(); y++) {
                    this.updateTile(
                        this.getTiles()[tileIndex],
                        new Position2D(x, y)
                    );
                    tileIndex++;
                }
            }
        }

        /**
         * Generate a tile set that will cover the tiles container.
         */
        function generateTileSet() {
            this.removeExtraTiles();
            this.generateMissingTiles();
        }

        /**
         * Remove any extra tiles from the DOM
         */
        function removeExtraTiles() {
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
        function generateMissingTiles() {
            var tileCount = this.getTilesCount();
            while (this.tiles.length < tileCount) {
                this.tiles.push(this.generateTile());
            }
        }

        function generateTile() {
            var newTile = jQuery('<div class="tile"></div>');
            jQuery(this.getTileContainer()).append(newTile);
            return newTile;
        }

        function getTilesCount() {
            return (this.getTilesWide() + 2) * (this.getTilesHigh() + 2);
        }

        function getTilesWide() {
            return Math.ceil(this.getWidth() / this.getTileSize());
        }

        function getTilesHigh() {
            return Math.ceil(this.getHeight() / this.getTileSize());
        }

        /**
         * Updates the DOM based on user interactions.
         */
        function updateDOM() {
            getParentClass(GameBoardController).prototype.updateDOM.apply(this);
            this.layoutTiles();
            this.translateTileContainer();
            this.getTileOffset();
        }

        /**
         * Returns the visible tiles area.
         * @returns {Position2D} The visible tiles area.
         */
        function getVisibleTilesArea() {
            return new Position2D(
                this.getTilesWide(),
                this.getTilesHigh()
            );
        }

        /**
         * Return the offset of the 0,0 tile in the display.
         * @returns {*}
         */
        function getTileOffset() {
            var position = this.getPosition();
            var xOffset = -Math.floor(position.getX() / this.getTileSize());
            var yOffset = -Math.floor(position.getY() / this.getTileSize());
            return new Position2D(xOffset, yOffset);
        }

        function translateTileContainer() {
            var offset = this.getTileTranslationOffset();
            var container = this.getTileContainer();
            var x = offset.getX();
            var y = offset.getY();
            jQuery(container).css({
                'transform': 'translate3d('+x+'px, '+y+'px, 0)'
            });
        }

        /**
         * Translate the given tile to the given X and Y position
         * @param tile
         * @param tilePosition
         */
        function updateTile(tile, tilePosition) {

            var translationPosition = this.getTileTranslation(tilePosition);
            var x = translationPosition.getX();
            var y = translationPosition.getY();

            jQuery(tile).css({
                'height': this.getTileSize() + 'px',
                'width': this.getTileSize() + 'px',
                'transform': 'translate3d('+x+'px, '+y+'px, 0)'
            });
        }

        function getTileTranslation(tilePosition) {
            return tilePosition.scale(this.getTileSize());
        }

        function getTileTranslationOffset() {
            return this.getPosition().modulo(
                    this.getTileSize()
                );
        }

        function setPosition(newPosition) {
            this.position = newPosition;
        }

    }
})();