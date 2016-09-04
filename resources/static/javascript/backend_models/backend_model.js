(() => {

    angular.module('backendModels').factory(
        'BackendModel',
        [
            'BaseModel',
            () => BackendModel,
        ]
    );

    class BackendModel extends BaseModel {

        static getHasManyRelations() {
            return new Map();
        }

        static getHasOneRelations() {
            return new Map();
        }

        static getRelatedClass(property) {
            if (this.isHasOneRelation(property)) {
                return this.getHasOneRelations().get(property);
            } else if (this.isHasManyRelation(property)) {
                return this.getHasManyRelations().get(property);
            } else {
                return undefined;
            }
        }

        static isHasManyRelation(property) {
            return this.getHasManyRelations().has(property);
        }

        static isHasOneRelation(property) {
            return this.getHasOneRelations().has(property);
        }
    }

})();