(() => {
    angular.module('thrashKiller').factory(
        'ThrashKillerRunCount',
        ThrashKillerRunCountFactory);

    function ThrashKillerRunCountFactory() {
        return Object.freeze({
            INDEFINITE: 'indefinite',
        });
    }
})();