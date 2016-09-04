(() => {

    "use strict";

    angular.module('djangular').directive('djangoModelTable',[
        'isDef',
        '$injector',
        djangoModelTableDirective
    ]);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for display django model information in a table.
     * Takes in a model name that must match an injectable Factory for a Django Model.
     * Also takes in a set of fields that should be displayed.
     * @returns {Object} the directive object for ...
     */
    function djangoModelTableDirective(
        isDef,
        $injector
    ) {
        var directive = {
            restrict: 'E',
            scope: {
                modelName: '=',
                fields: '='
            },
            controller: DjangoModelTableController,
            controllerAs: 'djangoModelTableVM',
            bindToController: true,
            templateUrl: '/static/javascript/djangular/directives/django_model_table/django_model_table.html'
        };

        // Controller methods
        DjangoModelTableController.prototype.getInstances = getInstances;
        DjangoModelTableController.prototype.getFields = getFields;
        DjangoModelTableController.prototype.setInstances = setInstances;
        DjangoModelTableController.prototype.getModelClass = getModelClass;

        return directive;
        // STOP! Hammer Time!
        // Just kidding, actually function time, just functions past this point please.

        function DjangoModelTableController() {
            this.instances = undefined;
            this.modelClass = undefined;
        }

        /**
         * Returns the fields we are going to display. Kept as a function in
         * case we need to do some funky refactoring to it later.
         * @returns {string|*}
         */
        function getFields() {
            if (isDef(this.fields)) {
                if (this.fields == 'all') {
                    this.fields = this.getModelClass().getDjangoFields();
                }
                return this.fields;
            } else {
                return [];
            }
        }

        /**
         * Sets the instances to the given array. Used as a callback for
         * after data retrieval has been successfully completed.
         * @param newInstances
         */
        function setInstances(newInstances) {
            this.instances = newInstances;
        }

        /**
         * Returns all of the instances of the given model as soon as they
         * are available. Returning an empty array until they've been returned.
         * @returns {Array}
         */
        function getInstances() {
            if (!isDef(this.instances)) {
                this.getModelClass().getAll().then(this.setInstances.bind(this));
                this.setInstances([]);
            }
            return this.instances;
        }

        /**
         * Return the model class associated with this table
         * @returns {*}
         */
        function getModelClass() {
            if (!isDef(this.modelClass)) {
                this.modelClass = $injector.get(this.modelName);
            }
            return this.modelClass;
        }

    }

})();