(function() {

    angular.module('chaffers').factory('CharacterDataService', CharacterDataService);

    CharacterDataService.$inject = [
        'djangoHTTP',
        'Character',
        'createPopulatedInstance'
    ];
    function CharacterDataService(
        djangoHTTP,
        Character,
        createPopulatedInstance
    ) {
        return {
            getCharacterById: getCharacterById
        };

        /**
         * Return the character with the given ID populated
         * with data retrieved from the backend.
         * @param djangoHTTP
         * @param characterId
         * @returns {Character}
         */
        function getCharacterById(characterId) {
            return djangoHTTP.post(
                '/characters/get_data_by_id',
                {
                    character_id: characterId
                }
            ).then(getCharacterFromPostResult);
        }

        /**
         * Return a character from a post result containing
         * the character's data in a character_data propery
         * of its data property
         * @param postResult
         */
        function getCharacterFromPostResult(postResult) {
            return getCharacterFromCharacterData(postResult.data.character_data);
        }

        /**
         * Return a populated instance of a Character using
         * the given data
         * @param characterData
         * @returns {Character}
         */
        function getCharacterFromCharacterData(characterData) {
            return createPopulatedInstance(Character, characterData);
        }
    }

})();
