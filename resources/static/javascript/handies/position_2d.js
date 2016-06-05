(function() {
    angular.module('handies').factory('Position2d', Position2dFactory);

    function Position2dFactory() {

        /**
         * Creates an X, Y coordinate
         * @param {number} x
         * @param {number} y
         */
        function Position2d(x, y) {
            this.x = x;
            this.y = y;
        }

        // Functions
        Position2d.prototype.difference = difference;
        Position2d.prototype.getX = getX;
        Position2d.prototype.getY = getY;
        Position2d.prototype.invert = invert;
        Position2d.prototype.modulo = modulo;
        Position2d.prototype.scale = scale;
        Position2d.prototype.translate = translate;

        // STOP! Just functions past this point.
        return Position2d;

        function getX() {
            return this.x;
        }

        function getY() {
            return this.y;
        }

        function modulo(moduloValue) {
            return new Position2d(
                this.getX() % moduloValue,
                this.getY() % moduloValue
            );
        }

        /**
         * Scale the vector
         * @param factor
         * @returns {Position2d}
         */
        function scale(factor) {
            return new Position2d(
                this.getX() * factor,
                this.getY() * factor
            );
        }

        function translate(translation) {
            return new Position2d(
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
         * @returns {Position2d}
         */
        function invert() {
            return new Position2d(
                -this.getX(),
                -this.getY()
            );
        }

    }
})();
