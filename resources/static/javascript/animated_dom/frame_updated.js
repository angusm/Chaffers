(function() {
    angular.module('animatedDom').factory('FrameUpdated', FrameUpdatedFactory);

    FrameUpdatedFactory.$inject = [
        'AnimatedDomService',
        'BaseModel',
        'extend'
    ];
    function FrameUpdatedFactory(
        AnimatedDomService,
        BaseModel,
        extend
    ) {
        FrameUpdated.$inject = [];

        function FrameUpdated() {
            AnimatedDomService.registerInstance(this);
        }
        extend(FrameUpdated, BaseModel);

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