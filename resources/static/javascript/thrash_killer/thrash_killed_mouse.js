(() => {
    angular.module('animatedDom').factory('thrashKilledMouse', [
        'ArrayMap',
        'BatchedFunction',
        'Position2d',
        ThrashKilledMouseFactory]);

    function ThrashKilledMouseFactory(
        ArrayMap,
        BatchedFunction,
        Position2d
    ) {

        let ThrashKilledMouseEvents = Object.freeze({
            LEFT_MOUSE_DOWN: 'left-mouse-down',
            LEFT_MOUSE_UP: 'left-mouse-up',
            MOUSE_DRAG: 'mouse-drag',
            MOUSE_MOVE: 'mouse-move',
        });

        // STOP! Functions only past this point.
        return new ThrashKilledMouse();

        class ThrashKilledMouse {
            constructor() {
                this.lastPosition = new Position2d();
                this.lastDragPosition = new Position2d();
                this.currentPosition = new Position2d();
                this.isDragging = false;
                this.eventsToRun = [];
                this.batchedFunctions = new ArrayMap();

                jQuery(element).bind('mousedown', (event) => {
                    this.handleMouseDownEvent(event)
                });
                jQuery(document).bind('mousemove', (event) => {
                    this.handleMouseMoveEvent(event)
                });
                jQuery(document).bind('mouseup', (event) => {
                    this.handleMouseUpEvent(event)
                });
            }

            register(fn, event, runCount) {
                this.batchedFunctions = new BatchedFunction(fn, runCount);
            }

            onLeftMouseDown(fn, runCount) {
                this.register(
                    fn,
                    ThrashKilledMouseEvents.LEFT_MOUSE_DOWN,
                    runCount);
            }

            onLeftMouseUp(fn, runCount) {
                this.register(
                    fn,
                    ThrashKilledMouseEvents.LEFT_MOUSE_UP,
                    runCount);
            }

            onMouseDrag(fn, runCount) {
                this.register(
                    fn,
                    ThrashKilledMouseEvents.MOUSE_DRAG,
                    runCount);
            }

            onMouseMove(fn, runCount) {
                this.register(
                    fn,
                    ThrashKilledMouseEvents.MOUSE_MOVE,
                    runCount);
            }

            /**
             * Handle changes to the mouse position.
             * @param event
             */
            handleMouseMoveEvent(event) {
                this.currentPosition = new Position2d(
                    event.pageX,
                    event.pageY
                );
            }

            handleMouseDownEvent(event) {
                this.startDragging();
                this.lastDragPosition = new Position2d(
                    event.pageX,
                    event.pageY
                );
                this.eventsToRun.push(ThrashKilledMouseEvents.LEFT_MOUSE_DOWN);
            }

            handleMouseUpEvent(event) {
                this.stopDragging();
                this.eventsToRun.push(ThrashKilledMouseEvents.LEFT_MOUSE_UP);
            }

            update() {
                this.eventsToRun.map((event) => {
                    this.batchedFunctions.get(event).map((batchedFn) => {
                        batchedFn.run(this.getParamsForEvent(event));
                    });
                });

                this.lastDragPosition = this.currentPosition;
                this.lastPosition = this.currentPosition;
            }

            getParamsForEvent(event) {
                switch(event) {
                    case ThrashKilledMouseEvents.LEFT_MOUSE_DOWN:
                        return this.currentPosition;
                    case ThrashKilledMouseEvents.LEFT_MOUSE_UP:
                        return this.currentPosition;
                    case ThrashKilledMouseEvents.MOUSE_DRAG:
                        return this.lastDragPosition.difference(
                            this.currentPosition);
                    case ThrashKilledMouseEvents.MOUSE_MOVE:
                        return this.lastPosition.difference(
                            this.currentPosition);
                }
            }

            isDragging() {
                return this.dragging;
            }

            startDragging() {
                this.dragging = true;
            }

            stopDragging() {
                this.dragging = false;
            }
        }

    }

})();