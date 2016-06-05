(function () {

    "use strict";

    angular.module('djangular').directive('djangoModelView',[
        'isDef',
        '$injector',
        djangoModelViewDirective
    ]);

    // STOP! Nothing but functions past this point ya hear?
    return;

    /**
     * Directive handler for display django model information in a table.
     * Takes in a model name that must match an injectable Factory for a Django Model.
     * Also takes in a set of fields that should be displayed.
     * @returns {Object} the directive object for ...
     */
    function djangoModelViewDirective(
        isDef,
        $injector
    ) {
        var directive = {
            restrict: 'E',
            scope: {
                modelName: '=',
                fields: '=',
                modelId: '='
            },
            controller: DjangoModelViewController,
            controllerAs: 'djangoModelViewVM',
            bindToController: true,
            templateUrl: '/static/javascript/djangular/directives/django_model_view/django_model_view.html'
        };

        // Controller methods
        DjangoModelViewController.prototype.getInstance = getInstance;
        DjangoModelViewController.prototype.getFields = getFields;
        DjangoModelViewController.prototype.getModelClass = getModelClass;

        return directive;
        // STOP! Hammer Time!
        // Just kidding, actually function time, just functions past this point please.

        function DjangoModelViewController() {
            this.instance = undefined;
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
                if (this.fields.indexOf('id') == -1) {
                    this.fields = ['id'].concat(this.fields);
                }
                return this.fields;
            } else {
                return ['id'];
            }
        }

        /**
         * Returns all of the instances of the given model as soon as they
         * are available. Returning an empty array until they've been returned.
         * @returns {Array}
         */
        function getInstance() {
            if (!isDef(this.instance)) {
                var ModelClass = this.getModelClass();
                this.instance = new ModelClass();
                this.instance.id = this.modelId;
            }
            return this.instance;
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