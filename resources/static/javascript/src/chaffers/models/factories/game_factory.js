GameFactory.$inject = [
    'ChaffersModel',
    'Player',
    'TextBlock',
];
export default GameFactory;

function GameFactory(
    ChaffersModel,
    Player,
    TextBlock,
) {
    return class Game extends ChaffersModel {
        static getDjangoModelName() {return 'Game';}

        static getDjangoFields() {
            return [
                ...super.getDjangoFields(),
                'displayName',
                'description',
                'gameMasters'
            ];
        }

        static getHasOneRelations() {
            return super.getHasOneRelations().set('description', TextBlock);
        }

        static getHasManyRelations() {
            return super.getHasManyRelations().set('gameMasters', Player);
        }

        /**
         * Returns the description of the game.
         * @returns {string} The description for the current game.
         */
        getDescription() {
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
        getDisplayName() {
            return this.displayName;
        }
    };
}
