(function() {

    angular.module('backendModels').factory(
        'BaseModel',
        [
            'classMethod',
            'classProperty',
            'getFirstDefined',
            baseModelFactory
        ]
    );

    function baseModelFactory(classMethod, classProperty, getFirstDefined) {

        function BaseModel() {
            this.currentClassContext = undefined;
        }

        // Class methods
        classProperty(BaseModel, 'currentClassContext', BaseModel);
        classMethod(BaseModel, 'getClassContext', getClassContext);
        classMethod(BaseModel, 'setClassContext', setClassContext);
        classMethod(BaseModel, 'callSuper', callSuper);
        classMethod(BaseModel, 'getParentClass', getParentClass);
        classMethod(BaseModel, 'getProto', getClassProto);
        classMethod(BaseModel, 'getParentClassFunction', getClassParentClassFunction);
        classMethod(BaseModel, 'getTopLevelConstructor', getClassToplevelConstructor);
        classMethod(BaseModel, 'getClass', getClassClass);
        classMethod(BaseModel, 'isChildOf', isChildOf);

        // Instance methods
        BaseModel.prototype.getParentClass = getParentClass;
        BaseModel.prototype.callSuper = callSuper;
        BaseModel.prototype.getClassContext = getClassContext;
        BaseModel.prototype.setClassContext = setClassContext;
        BaseModel.prototype.getProto = getInstanceProto;
        BaseModel.prototype.getParentClassFunction = getInstanceParentClassFunction;
        BaseModel.prototype.getTopLevelConstructor = getInstanceToplevelConstructor;
        BaseModel.prototype.getClass = getInstanceClass;

        return BaseModel;
        // STOP! Functions only past this point

        function isChildOf(TargetParentClass) {
            var parentClass = this.getParentClass();
            if (parentClass == TargetParentClass) {
                return true;
            } else if (parentClass == this.getTopLevelConstructor()) {
                return false;
            } else {
                return parentClass.isChildOf(TargetParentClass);
            }
        }

        function getClassClass() {
            return this;
        }

        function getInstanceClass() {
            return this.constructor;
        }

        function getClassToplevelConstructor() {
            return Object;
        }

        function getInstanceToplevelConstructor() {
            return Object;
        }

        function getInstanceProto() {
            return this.__proto__;
        }

        function getClassProto() {
            return this.prototype.__proto__;
        }

        /**
         * Get the parent class respecting the current class context
         * @returns {function}
         */
        function getParentClass() {
            var context = this.getClassContext();
            return context.getProto().constructor;
        }

        /**
         * Calls the given function from the parent class on the current instance
         * relative to its current class context.
         * @param functionName
         * @param args
         */
        function callSuper(functionName, args) {

            // Store the current class context
            var currentClassContext = this.getClassContext();

            // Set the class context to the parent class and call the function
            var parentClass = this.getParentClass();
            var parentClassFunction = this.getParentClassFunction(functionName);
            this.setClassContext(parentClass);
            parentClassFunction.apply(this, args);

            // Restore the class context
            this.setClassContext(currentClassContext);
        }

        /**
         * Returns the given instance parent class instance method
         * @param functionName
         * @returns {function}
         */
        function getInstanceParentClassFunction(functionName) {
            var parentClass = this.getParentClass();
            while (
                parentClass != this.getTopLevelConstructor() &&
                typeof parentClass.prototype[functionName] !== 'function'
            ) {
                parentClass = parentClass.getParentClass();
            }

            if (!parentClass.prototype[functionName]) {
                throw new Error('Unable to find parent class function "' + functionName + '" from "' + this.getParentClass().name + '"');
            } else {
                return parentClass.prototype[functionName];
            }
        }

        /**
         * Returns the given parent class class method
         * @param functionName
         * @returns {function}
         */
        function getClassParentClassFunction(functionName) {
            return this.getParentClass()[functionName];
        }

        /**
         * Returns the current class context for the instance. The class that should be used as
         * the current class when determining the parent class
         * @returns {BaseModel|*}
         */
        function getClassContext() {
            this.currentClassContext = getFirstDefined(this.currentClassContext, this.getClass());
            return this.currentClassContext;
        }

        function setClassContext(newContext) {
            this.currentClassContext = newContext;
        }

    }

})();