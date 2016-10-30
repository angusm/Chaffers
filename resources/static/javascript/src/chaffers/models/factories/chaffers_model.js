ChaffersModelFactory.$inject = ['DjangoModel'];
export default ChaffersModelFactory;

function ChaffersModelFactory(
    DjangoModel,
) {
    return class ChaffersModel extends DjangoModel {
        static getDataQueryURL() {
            return '/resources';
        }

        getViewURL() {
            return '/resources/view/' + this.constructor.getModelName() + '/' +
                this.id;
        }
    };
}
