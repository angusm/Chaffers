(() => {
    angular.module('thrashKiller').factory('ThrashKillerStep', ThrashKillerStepFactory);

    ThrashKillerStepFactory.$inject = [];

    function ThrashKillerStepFactory() {
        return Object.freeze({
            PRE_RENDER: 'pre-render',
            RENDER: 'render',
            POST_RENDER: 'post-render',
        });
    }
})();