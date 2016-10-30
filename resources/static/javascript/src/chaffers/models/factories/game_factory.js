GameFactory.$inject = [
    'ChaffersModel',
];
export default GameFactory;

function GameFactory(
    ChaffersModel,
) {
    return class Game extends ChaffersModel {
        constructor(id) {
            super(id);
            this.createHasOneField('description', 'chaffers', 'TextBlock');
            this.createCharField('displayName');
            this.createHasManyField('gameMasters', 'chaffers', 'Player');
        }

        static getModelName() {return 'Game';}

        /**
         * Returns the description of the game.
         * @returns {string} The description for the current game.
         */
        getDescription() {
            // If the description is not an instance of text block return nothing
            if (typeof this.description === null) {
                return '';
            }
            return this.description.getText();
        }

        /**
         * Return the display name for the current game.
         * @returns {string} The display name for the current game;
         */
        getDisplayName() {
            return this.displayName;
        }
    };
}
