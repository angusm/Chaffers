(function() {

    angular.module('chaffers').factory('Character', [
        'Specialty',
        'Flaw',
        'BaseModel',
        'relationManager',
        'extend',
        'TextBlock',
        CharacterFactory
    ]);

    function CharacterFactory(
        Specialty,
        Flaw,
        BaseModel,
        relationManager,
        extend,
        TextBlock
    ) {

        function Character() {

            this.id = undefined;
            this.specialties = undefined;
            this.flaws = undefined;
            this.description = undefined;
            this.displayName = undefined;

            BaseModel.apply(this, arguments);

        }
        extend(Character, BaseModel);

        // Functions
        Character.prototype.getDisplayName = getDisplayName;
        Character.prototype.getFlaws = getFlaws;
        Character.prototype.getSpecialties = getSpecialties;
        Character.prototype.getDescription = getDescription;
        Character.prototype.getCharacterSheetURL = getCharacterSheetURL;

        // Register Relations
        relationManager.registerHasManyRelation(Character, 'flaws', Flaw);
        relationManager.registerHasManyRelation(Character, 'specialties', Specialty);
        relationManager.registerHasOneRelation(Character, 'description', TextBlock);

        return Character;

        // STOP! Only functions past here.

        /**
         * Return the display name for this character
         * @returns {undefined|*}
         */
        function getDisplayName() {
            return this.displayName;
        }

        /**
         * Return a link to the character's sheet
         * @returns {string}
         */
        function getCharacterSheetURL() {
            return '/characters/view/' + this.id;
        }

        /**
         * Return the description for the character
         * @returns {*}
         */
        function getDescription() {

            // If the description is not an instance of text block return nothing
            if (typeof this.description === 'undefined') {
                return '';
            }

            return this.description.getText();
        }

        /**
         * Return the character's flaws
         * @returns {undefined|*}
         */
        function getFlaws() {
            return this.flaws;
        }

        /**
         * Return the character's specialties
         * @returns {undefined|*}
         */
        function getSpecialties() {
            return this.specialties;
        }

    }

})();
