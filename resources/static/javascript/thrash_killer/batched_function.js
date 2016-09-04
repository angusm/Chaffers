(() => {
    angular.module('thrashKiller').factory('BatchedFunction', [
        'BaseModel',
        'ThrashKillerRunCount',
        BatchedFunctionFactory,
    ]);

    function BatchedFunctionFactory(
        BaseModel,
        ThrashKillerRunCount,
    ) {

        class BatchedFunction extends BaseModel {

            constructor(fn, runCount = ThrashKillerRunCount.INDEFINITE) {
                this.fn = fn;
                this.runCount = runCount;
            }

            decrementRunCount() {
                if (!this.isRunningIndefinitely()) {
                    this.runCount--;
                }
            }

            isFinished() {
                return !this.isRunningIndefinitely() &&
                    this.runCount <= 0;
            }

            isRunningIndefinitely() {
                return this.runCount === ThrashKillerRunCount.INDEFINITE;
            }

            run() {
                if (!this.isFinished()) {
                    this.fn();
                    this.decrementRunCount();
                }
            }

            stop() {
                this.runCount = 0;
            }

        }

        // STOP! Functions only past this point.
        return BatchedFunction;

    }



})();