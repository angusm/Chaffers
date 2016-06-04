(function() {

    angular.module('djangular').factory(
        'createDjangoField',
        [
            'DjangoModel',
            'isFunction',
            createDjangoFieldFactory
        ]
    );

    function createDjangoFieldFactory(
        DjangoModel,
        isFunction
    ) {

        /**
         * Adds the given field to the set of django fields on the given Django Model subclass
         * @param {DjangoModel} DjangoModelSubClass
         * @param {string} fieldName
         */
        function createDjangoField(DjangoModelSubClass, fieldName) {
            DjangoModelSubClass.createDjangoField(fieldName);
        }
        return createDjangoField;
        // STOP! Functions only past this point

    }

})();