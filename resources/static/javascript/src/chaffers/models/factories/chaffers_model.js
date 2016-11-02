ChaffersModelFactory.$inject = ['DjangoModel'];
let ChaffersModel;
export default ChaffersModelFactory;

function ChaffersModelFactory(
    DjangoModel,
) {
    ChaffersModel = ChaffersModel || class ChaffersModel extends DjangoModel {
        static getDataQueryURL() {
            return '/resources';
        }

        getViewURL() {
            return '/resources/view/' + this.constructor.getModelName() + '/' +
                this.id;
        }
    };
    return ChaffersModel;
}
