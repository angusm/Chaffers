(function() {
    angular.module('animatedDom').factory('AnimatedDomService', AnimatedDomServiceFactory);

    AnimatedDomServiceFactory.$inject = [];
    function AnimatedDomServiceFactory() {
        AnimatedDomService.$inject = [];

        function AnimatedDomService() {
            this.frameUpdatedInstances = [];
            this.updateInstances();
        }

        // Functions
        AnimatedDomService.prototype.registerInstance = registerInstance;
        AnimatedDomService.prototype.updateInstances = updateInstances;
        AnimatedDomService.prototype.queryDOM = queryDOM;
        AnimatedDomService.prototype.updateDOM = updateDOM;

        // STOP! Functions only past this point.
        return new AnimatedDomService();

        function registerInstance(frameUpdatedInstance) {
            this.frameUpdatedInstances.push(frameUpdatedInstance);
        }

        /**
         * Update all of the frame updated instances once a frame.
         */
        function updateInstances() {
            this.frameUpdatedInstances.forEach(this.queryDOM.bind(this));
            this.frameUpdatedInstances.forEach(this.updateDOM.bind(this));
            requestAnimationFrame(this.updateInstances.bind(this));
        }

        /**
         * Run the query dom function on the given instance.
         * @param frameUpdatedInstance
         */
        function queryDOM(frameUpdatedInstance) {
            frameUpdatedInstance.queryDOM();
        }

        /**
         * Run the update dom function on the given instance.
         * @param frameUpdatedInstance
         */
        function updateDOM(frameUpdatedInstance) {
            frameUpdatedInstance.updateDOM();
        }

    }



})();