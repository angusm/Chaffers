(function() {

    angular.module('chaffers').factory('classManager', [
        'getFirstDefined',
        'getParentClass',
        RelationManagerFactory
    ]);

    /**
     * Used to manage relationships between various classes
     * @param Relation
     * @param getFirstDefined
     * @param getParentClass
     * @returns {RelationManager}
     * @constructor
     */
    function RelationManagerFactory(Relation, getFirstDefined, getParentClass) {

        // Used to track relation identifiers on classes

        // Relation Manager
        function RelationManager() {
            this.relationsString = '__RelationManager__relations_' + new Date().getTime();
        }

        // Functions
        RelationManager.prototype.isHasManyRelationPropertyOnInstance = isHasManyRelationPropertyOnInstance;
        RelationManager.prototype.isHasManyRelationPropertyOnClass = isHasManyRelationPropertyOnClass;
        RelationManager.prototype.isHasOneRelationPropertyOnInstance = isHasOneRelationPropertyOnInstance;
        RelationManager.prototype.isHasOneRelationPropertyOnClass = isHasOneRelationPropertyOnClass;
        RelationManager.prototype.isHasManyRelation = isHasManyRelation;
        RelationManager.prototype.isHasOneRelation = isHasOneRelation;
        RelationManager.prototype.registerRelation = registerRelation;
        RelationManager.prototype.getRelations = getRelations;
        RelationManager.prototype.isRelationOnClass = isRelationOnClass;
        RelationManager.prototype.getRelation = getRelation;
        RelationManager.prototype.getRelationClass = getRelationClass;
        RelationManager.prototype.getRelationsFromClass = getRelationsFromClass;
        RelationManager.prototype.registerHasOneRelation = registerHasOneRelation;
        RelationManager.prototype.registerHasManyRelation = registerHasManyRelation;
        RelationManager.prototype.getDirectRelations = getDirectRelations;

        return new RelationManager();

        // STOP! We just want classes beyond this point, after all nothing else will get
        // hoisted up above that nice little return we've got.

        /**
         * Returns true if the given property defines a has one relation on the given
         * class/instance
         * @param valueToCheck Either an instance of a class or the class itself
         * @param propertyString
         */
        function isHasOneRelation(valueToCheck, propertyString) {
            if (typeof valueToCheck === 'function') {
                return this.isHasOneRelationPropertyOnClass(valueToCheck, propertyString);
            }
            else {
                return this.isHasOneRelationPropertyOnInstance(valueToCheck, propertyString);
            }
        }

        /**
         * Returns true if the given property defines a has many relation on the given
         * class/instance
         * @param valueToCheck Either an instance of a class or the class itself
         * @param propertyString
         */
        function isHasManyRelation(valueToCheck, propertyString) {
            if (typeof valueToCheck === 'function') {
                return this.isHasManyRelationPropertyOnClass(valueToCheck, propertyString);
            }
            else {
                return this.isHasManyRelationPropertyOnInstance(valueToCheck, propertyString);
            }
        }


        /**
         * Returns true if a has one relation has been registered on the instance's
         * class under the given property string
         * @param instanceToCheck
         * @param propertyString
         * @returns {boolean|*}
         */
        function isHasOneRelationPropertyOnInstance(instanceToCheck, propertyString) {
            var instanceClass = instanceToCheck.constructor;
            return this.isHasOneRelationPropertyOnClass(instanceClass, propertyString);
        }

        /**
         * Returns true if a has one relation has been registered on the class under
         * the given property string
         * @param classToCheck
         * @param propertyString
         * @returns {boolean}
         */
        function isHasOneRelationPropertyOnClass(classToCheck, propertyString) {

            // First check that this is a valid relation on the class
            if (!this.isRelationOnClass(classToCheck, propertyString)) {
                return false;
            }

            var relation = this.getRelation(classToCheck, propertyString);
            return relation.isHasOneRelation();

        }

        /**
         * Returns true if a has many relation has been registered on the instance's
         * class under the given property string
         * @param instanceToCheck
         * @param propertyString
         * @returns {boolean|*}
         */
        function isHasManyRelationPropertyOnInstance(instanceToCheck, propertyString) {
            var instanceClass = instanceToCheck.constructor;
            return this.isHasManyRelationPropertyOnClass(instanceClass, propertyString);
        }

        /**
         * Returns true if a has many relation has been registered on the class under
         * the given property string
         * @param classToCheck
         * @param propertyString
         * @returns {boolean}
         */
        function isHasManyRelationPropertyOnClass(classToCheck, propertyString) {

            // First check that this is a valid relation on the class
            if (!this.isRelationOnClass(classToCheck, propertyString)) {
                return false;
            }

            var relation = this.getRelation(classToCheck, propertyString);
            return relation.isHasManyRelation();

        }

        /**
         * Returns true if a relation has been registered on the class under the
         * given property string
         * @param classToCheck
         * @param propertyString
         * @returns {boolean}
         */
        function isRelationOnClass(classToCheck, propertyString) {
            var relations = this.getRelations(classToCheck);
            return typeof(relations[propertyString]) === 'object';
        }

        /**
         * Register a relation on the given property to the given class
         * on the given class
         * @param primaryClass
         * @param relationProperty
         * @param relationClass
         * @param relationType
         */
        function registerRelation(primaryClass, relationProperty, relationClass, relationType) {

            // Get the existing relations
            var primaryClassRelations = this.getDirectRelations(primaryClass);

            // Don't let relations be overridden
            if (typeof primaryClassRelations[relationProperty] !== 'undefined') {
                throw new Error('Cannot override relation.')
            }

            // Set the relation
            primaryClassRelations[relationProperty] = new Relation(relationClass, relationType);
        }

        /**
         * Register a has one relation on the given property to the given class
         * on the given class
         * @param primaryClass
         * @param relationProperty
         * @param relationClass
         */
        function registerHasOneRelation(primaryClass, relationProperty, relationClass) {
            this.registerRelation(primaryClass, relationProperty, relationClass, Relation.TYPES.HAS_ONE);
        }

        /**
         * Register a has one relation on the given property to the given class
         * on the given class
         * @param primaryClass
         * @param relationProperty
         * @param relationClass
         */
        function registerHasManyRelation(primaryClass, relationProperty, relationClass) {
            this.registerRelation(primaryClass, relationProperty, relationClass, Relation.TYPES.HAS_MANY);
        }

        /**
         * Retrieves the relations mapping for a given class, but only those mapped
         * to it directly, not those mapped to parent classes
         * @param classToCheck
         * @returns {object}
         */
        function getDirectRelations(classToCheck) {
            if (typeof classToCheck[this.relationsString] === 'undefined') {
                classToCheck[this.relationsString] = {};
            }
            return classToCheck[this.relationsString];
        }

        /**
         * Retrieves the relations mapping for a given class or instance and all
         * classes along its prototype chain
         * @param thingToCheck
         */
        function getRelations(thingToCheck) {
            if (typeof thingToCheck === 'function') {
                return this.getRelationsFromClass(thingToCheck);
            }
            else {
                return this.getRelationsFromClass(thingToCheck.constructor);
            }
        }

        /**
         * Retrieves the relations mapping for a given class and all classes along its
         * prototype chain
         * @param classToCheck
         * @param childRelations Relations retrieved from previous calls on the class' children
         * @returns {object}
         */
        function getRelationsFromClass(classToCheck, childRelations) {

            // Start with a blank slate if childRelations weren't defined
            var relationsToReturn = getFirstDefined(childRelations, {});

            // Get the direct relations on the current class
            var directRelations = this.getDirectRelations(classToCheck);

            // Iterate through all of the properties bearing relations on the
            // current class and add them to the relations to return if there
            // is no other relation defined for the given property string
            Object.keys(directRelations).forEach(function(propertyString) {
                relationsToReturn[propertyString] = getFirstDefined(
                    relationsToReturn[propertyString],
                    directRelations[propertyString]
                )
            });

            // Return the result of calling this function again on the current
            // class' parent class if any
            var parentClass = getParentClass(classToCheck);
            if (parentClass !== Object) {
                return this.getRelationsFromClass(parentClass, relationsToReturn);
            }
            else {
                return relationsToReturn;
            }

        }

        /**
         * Returns the relation object stored on the given class under the given property
         * @param thingToCheck Either a class instance or a Class itself
         * @param propertyString
         * @returns {*}
         */
        function getRelation(thingToCheck, propertyString) {
            return this.getRelations(thingToCheck)[propertyString];
        }

        /**
         * Returns the relation class for the relation defined on the given property on
         * the given class
         * @param thingToCheck Either a class instance or a Class itself
         * @param propertyString
         * @returns {*}
         */
        function getRelationClass(thingToCheck, propertyString) {
            return this.getRelation(thingToCheck, propertyString).getRelatedClass();
        }

    }

})();
