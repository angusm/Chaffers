(() => {
    angular.module('thrashKiller').factory('ThrashKillerStepOrder', [
        'ThrashKillerStep',
        (ThrashKillerStep) => Object.freeze([
            ThrashKillerStep.PRE_RENDER,
            ThrashKillerStep.RENDER,
            ThrashKillerStep.POST_RENDER
        ])
    ]);
})();