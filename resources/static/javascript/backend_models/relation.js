(function() {

    angular.module('backendModels').factory('Relation', RelationFactory);

    /**
     * Class to contain relation information used by the Relationship Manager
     * @returns {Relation}
     * @constructor
     */
    function RelationFactory() {

        function Relation(relatedClass, relationType) {
            this.setRelatedClass(relatedClass);
            this.setRelationType(relationType);
        }

        Relation.TYPES = {};
        Relation.TYPES.HAS_MANY = 'HAS_MANY';
        Relation.TYPES.HAS_ONE = 'HAS_ONE';

        Relation.prototype.relatedClass = undefined;
        Relation.prototype.relationType = undefined;

        Relation.prototype.isHasOneRelation = isHasOneRelation;
        Relation.prototype.isHasManyRelation = isHasManyRelation;
        Relation.prototype.setRelatedClass = setRelatedClass;
        Relation.prototype.setRelationType = setRelationType;
        Relation.prototype.getRelatedClass = getRelatedClass;

        function getRelatedClass(relatedClass) {
            return this.relatedClass;
        }

        function setRelatedClass(relatedClass) {
            this.relatedClass = relatedClass;
        }

        function setRelationType(relationType) {
            this.relationType = relationType;
        }

        function isHasOneRelation() {
            return this.relationType === Relation.TYPES.HAS_ONE;
        }

        function isHasManyRelation() {
            return this.relationType === Relation.TYPES.HAS_MANY;
        }

        return Relation;
    }

})();
