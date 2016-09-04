(() => {
    angular.module('thrashKiller').factory('ThrashKiller', ThrashKillerFactory);

    ThrashKillerFactory.$inject = [
        'ArrayMap',
        'BaseModel',
        'BatchedFunction',
        'ThrashKilledMouse',
        'ThrashKillerStep',
        'ThrashKillerStepOrder',
    ];
    function ThrashKillerFactory(
        ArrayMap,
        BaseModel,
        BatchedFunction,
        thrashKilledMouse,
        ThrashKillerStep,
        ThrashKillerStepOrder,
    ) {

        class ThrashKiller extends BaseModel {

            constructor() {
                this.batchedFunctions = new ArrayMap();
                this.runLoop();
            }

            runBatchedFunction(step, batchedFn) {
                if (batchedFn.isFinished()) {
                    this.batchedFunctions.removeFromArray(step, batchedFn);
                } else {
                    batchedFn.run();
                }
            }

            runLoop() {
                thrashKilledMouse.update();
                ThrashKillerStepOrder.map((step) => {
                    this.batchedFunctions.get(step).map((batchedFn) => {
                        this.runBatchedFunction(step, batchedFn);
                    });
                });
                window.requestAnimationFrame(() => {
                    this.runLoop();
                });
            }

            preRender(fn, runCount) {
                return this.register(fn, ThrashKillerStep.PRE_RENDER, runCount);
            }

            render(fn, runCount) {
                return this.register(fn, ThrashKillerStep.RENDER, runCount);
            }

            postRender(fn, runCount) {
                return this.register(fn, ThrashKillerStep.POST_RENDER, runCount);
            }

            register(fn, step, runCount) {
                let batchedFn = new BatchedFunction(fn, runCount);
                this.batchedFunctions.pushOnArray(step, batchedFn);
                return batchedFn;
            }

        }

        // STOP! Functions only past this point.
        return new ThrashKiller();

    }



})();