(function() {
    angular.module('animatedDom').factory('FrameUpdated', FrameUpdatedFactory);

    FrameUpdatedFactory.$inject = [
        'AnimatedDomService'
    ];
    function FrameUpdatedFactory(
        AnimatedDomService
    ) {
        FrameUpdated.$inject = [];

        function FrameUpdated() {
            AnimatedDomService.registerInstance(this);
        }

        // Functions
        FrameUpdated.prototype.queryDOM = queryDOM;
        FrameUpdated.prototype.updateDOM = updateDOM;

        // STOP! Functions only past this point.
        return FrameUpdated;

        /**
         * Run the query dom function on the current instance.
         */
        function queryDOM() {}

        /**
         * Run the update dom function on the current instance.
         */
        function updateDOM() {}

    }



})();