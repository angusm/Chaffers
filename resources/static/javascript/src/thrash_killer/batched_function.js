import ThrashKillerRunCount from './thrash_killer_run_count';
import BaseModel from '../backend_models/base_model';


export default class BatchedFunction extends BaseModel {
    constructor(fn, runCount = ThrashKillerRunCount.INDEFINITE) {
        super();
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
