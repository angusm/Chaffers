createPopulatedDjangoModelFactory.$inject = ['populateDjangoModel'];
function createPopulatedDjangoModelFactory(populateDjangoModel) {

    /**
     * Populate the given instance with data retrieved from the given URL
     * @param targetURL
     * @param ModelClass
     * @param id
     * @returns {*}
     */
    function createPopulatedDjangoModel(ModelClass, id) {
        var instance = new ModelClass();
        instance.id = id;
        return populateDjangoModel(instance);
    }

    return createPopulatedDjangoModel;
}

export default createPopulatedDjangoModelFactory;
