(function() {
    angular.module('handies').factory('Position2D', Position2DFactory);

    function Position2DFactory() {

        /**
         * Creates an X, Y coordinate
         * @param {number} x
         * @param {number} y
         */
        function Position2D(x, y) {
            this.x = x;
            this.y = y;
        }

        // Functions
        Position2D.prototype.difference = difference;
        Position2D.prototype.getX = getX;
        Position2D.prototype.getY = getY;
        Position2D.prototype.invert = invert;
        Position2D.prototype.modulo = modulo;
        Position2D.prototype.scale = scale;
        Position2D.prototype.setX = setX;
        Position2D.prototype.setY = setY;
        Position2D.prototype.translate = translate;

        // STOP! Just functions past this point.
        return Position2D;

        function getX() {
            return this.x;
        }

        function getY() {
            return this.y;
        }

        function setX(x) {
            this.x = x;
        }

        function setY(y) {
            this.y = y;
        }

        function modulo(moduloValue) {
            return new Position2D(
                this.getX() % moduloValue,
                this.getY() % moduloValue
            );
        }

        /**
         * Scale the vector
         * @param factor
         * @returns {Position2D}
         */
        function scale(factor) {
            return new Position2D(
                this.getX() * factor,
                this.getY() * factor
            );
        }

        function translate(translation) {
            return new Position2D(
                this.getX() + translation.getX(),
                this.getY() + translation.getY()
            );
        }

        function difference(subtrahend) {
            return this.translate(
                subtrahend.invert()
            );
        }

        /**
         * Invert the position
         * @returns {Position2D}
         */
        function invert() {
            return new Position2D(
                -this.getX(),
                -this.getY()
            );
        }

    }
})();
