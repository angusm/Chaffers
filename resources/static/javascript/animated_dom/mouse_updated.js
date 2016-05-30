(function() {
    angular.module('animatedDom').factory('MouseUpdated', MouseUpdatedFactory);

    MouseUpdatedFactory.$inject = [
        'FrameUpdated',
        'extend',
        'Position2D'
    ];
    function MouseUpdatedFactory(
        FrameUpdated,
        extend,
        Position2D
    ) {
        MouseUpdated.$inject = [];

        function MouseUpdated(element) {
            FrameUpdated.apply(this);

            this.mousePosition = new Position2D();
            this.dragging = false;

            jQuery(element).bind('mousedown', this.handleMouseDown.bind(this));
            jQuery(document).bind('mousemove', this.handleMouseMove.bind(this));
            jQuery(document).bind('mouseup', this.handleMouseUp.bind(this));
        }
        extend(MouseUpdated, FrameUpdated);

        // Functions
        MouseUpdated.prototype.getMousePosition = getMousePosition;
        MouseUpdated.prototype.handleDrag = handleDrag;
        MouseUpdated.prototype.handleMouseDown = handleMouseDown;
        MouseUpdated.prototype.handleMouseMove = handleMouseMove;
        MouseUpdated.prototype.handleMouseUp = handleMouseUp;
        MouseUpdated.prototype.isDragging = isDragging;
        MouseUpdated.prototype.queryDOM = queryDOM;
        MouseUpdated.prototype.setMousePosition = setMousePosition;
        MouseUpdated.prototype.startDragging = startDragging;
        MouseUpdated.prototype.stopDragging = stopDragging;
        MouseUpdated.prototype.updateDOM = updateDOM;

        // STOP! Functions only past this point.
        return MouseUpdated;

        /**
         * Returns the current mouse position.
         * @returns {Position2D}
         */
        function getMousePosition() {
            return this.mousePosition;
        }

        function setMousePosition(newPosition) {
            this.mousePosition = newPosition;
        }

        /**
         * Handle changes to the mouse position.
         * @param event
         */
        function handleMouseMove(event) {
            var newMousePosition = new Position2D(
                event.pageX,
                event.pageY
            );
            if (this.isDragging()) {
                this.handleDrag(
                    newMousePosition.difference(
                        this.getMousePosition()
                    )
                );
            }
            this.setMousePosition(newMousePosition);
        }

        function handleMouseDown(event) {
            this.startDragging();
        }

        function handleMouseUp(event) {
            this.stopDragging();
        }

        function isDragging() {
            return this.dragging;
        }

        function startDragging() {
            this.dragging = true;
        }

        function stopDragging() {
            this.dragging = false;
        }

        /**
         * Handle a drag event
         * @param {Position2D} dragVector The X and Y distance dragged
         */
        function handleDrag(dragVector) {}

        /**
         * Run the query dom function on the current instance.
         */
        function queryDOM() {
            MouseUpdated.ParentClass.prototype.queryDOM.apply(this);
        }

        /**
         * Run the update dom function on the current instance.
         */
        function updateDOM() {
            MouseUpdated.ParentClass.prototype.updateDOM.apply(this);
        }

    }

})();