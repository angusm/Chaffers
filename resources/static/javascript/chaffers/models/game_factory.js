(function() {

    angular.module('chaffers').factory('Game', [
        'BaseModel',
        'Player',
        'TextBlock',
        'extend',
        'relationManager',
        gameFactory
    ]);

    function gameFactory(
        BaseModel,
        Player,
        TextBlock,
        extend,
        relationManager
    ) {

        function Game() {

            this.displayName = undefined;
            this.description = undefined;
            this.gameMasters = undefined;

            BaseModel.apply(this, arguments);
        }

        // Inherit from the Base Model since this is a backend model
        extend(Game, BaseModel);

        // Attach relations
        relationManager.registerHasOneRelation(Game, 'description', TextBlock);
        relationManager.registerHasManyRelation(Game, 'gameMasters', Player);

        // Instance Functions
        Game.prototype.getDescription = getDescription;
        Game.prototype.getDisplayName = getDisplayName;

        return Game;

        /**
         * Returns the description of the game.
         * @returns {string} The description for the current game.
         */
        function getDescription() {
            // If the description is not an instance of text block return nothing
            if (typeof this.description === 'undefined') {
                return '';
            }
            return this.description.getText();
        }

        /**
         * Return the display name for the current game.
         * @returns {string} The display name for the current game;
         */
        function getDisplayName() {
            return this.displayName;
        }

    }

})();
