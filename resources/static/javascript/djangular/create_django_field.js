(function() {

    angular.module('djangular').factory(
        'createDjangoField',
        [
            'populateDjangoModel',
            'DjangoModel',
            'isDef',
            createDjangoFieldFactory
        ]
    );

    function createDjangoFieldFactory(
        populateDjangoModel,
        DjangoModel,
        isDef
    ) {

        function createDjangoField(instance, fieldName) {

            if (!instance instanceof DjangoModel) {
                throw new Error('Can only create a django field on an instance of a DjangoModel')
            }

            instance.djangoValues[fieldName] = undefined;
            instance.loadingDjangoValue[fieldName] = false;
            Object.defineProperty(
                instance,
                fieldName, {
                    get: function() {
                        if (!isDef(instance.djangoValues[fieldName]) && !this.loadingDjangoValue[fieldName]) {
                            this.loadingDjangoValue[fieldName] = true;
                            populateDjangoModel(instance);
                        }
                        return instance.djangoValues[fieldName];
                    },
                    set: function(value) {
                        this.djangoValues[fieldName] = value;
                    }
                }
            );
        }
        return createDjangoField;
        // STOP! Functions only past this point

    }

})();