(() => {

    angular.module('chaffers').factory('populateInstance', [
        'BackendModel',
        'caseTransform',
        'isArray',
        'isNonNullObject',
        populateInstanceFactory,
    ]);

    function populateInstanceFactory(
        BackendModel,
        caseTransform,
        isArray,
        isNonNullObject,
    ) {

        return populateInstance;
        // STOP! Nothing but functions past here please

        /**
         * Returns a function that will populate a given class instance with the given
         * data using information from the relation manager to create instances of
         * related classes as appropriate
         * @param instance
         * @param data
         * @returns Populated instance
         */
        function populateInstance(instance, data) {

            // If the instance is not a a BackendModel throw an error
            if (!(instance instanceof BackendModel)) {
                throw new Error('Can only populate BackendModel instances');
            }

            // If the data for population is not valid jump out
            if (!isNonNullObject(data)) {
                throw new Error(
                    'Data for population must be a non-null object');
            }

            let InstanceClass = instance.constructor;

            Object.keys(data).forEach((dataKey) => {

                // Convert the key to a camel cased key
                let camelCasedKey = caseTransform.snakeCaseToCamelCase(dataKey);
                let value = data[dataKey];

                // If the instance doesn't have the given property then
                // on to the next one
                if (!instance.hasOwnProperty(camelCasedKey)) {
                    return;
                }

                // Check for a has one relation on the instance
                if (InstanceClass.isHasOneRelation(camelCasedKey)) {
                    populateHasOneRelation(instance, camelCasedKey, value);
                }

                // Check for a has many relation on the instance
                else if (InstanceClass.isHasManyRelation(camelCasedKey)) {
                    populateHasManyRelation(instance, camelCasedKey, value);
                }

                // If there are no relations on the instance then we can simply do straight assignment
                else {
                    instance[camelCasedKey] = value;
                }

            });

            return instance;
        }

        /**
         * Populates a has many relation property on an instance
         * @param instance
         * @param property
         * @param values
         */
        function populateHasManyRelation(instance, property, values) {

            // Jump out if the given data is not valid
            if (!isArray(values)) {
                return;
            }

            instance[property] = values.filter((value) => {
                return isNonNullObject(value);
            }).map((value) => {
                return getRelationInstance(
                    instance,
                    property,
                    value);
            });
        }

        /**
         * Populates a has one relation property on an instance
         * @param instance
         * @param property
         * @param data
         */
        function populateHasOneRelation(instance, property, data) {
            // Jump out if the given data is not valid
            if (!isNonNullObject(data)) {
                return;
            }

            instance[property] = getRelationInstance(instance, property, data);
        }

        /**
         * Creates an instance of the related class
         * @param instance
         * @param property
         * @param data
         */
        function getRelationInstance(instance, property, data) {
            let InstanceClass = instance.constructor;
            let RelationClass = InstanceClass.getRelatedClass(property);
            return populateInstance(new RelationClass(), data);
        }

    }

})();
