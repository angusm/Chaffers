import djangular from '../djangular/main';

// Controller Imports
import LoginController from './controllers/login';

// Factory Imports
import AbilityFactory from './models/factories/ability_factory';
import AbilityModifierFactory from './models/factories/ability_modifier_factory';
import AttributeFactory from './models/factories/attribute_factory';
import AttributeModifierFactory from './models/factories/attribute_modifier_factory';
import ChaffersModelFactory from './models/factories/chaffers_model';
import CharacterFactory from './models/factories/character_factory';
import CharacterTraitFactory from './models/factories/character_trait_factory';
import CheckContextFactory from './models/factories/check_context_factory';
import FlawFactory from './models/factories/flaw_factory';
import GameBoardPositionFactory from './models/factories/game_board_position_factory';
import GameCharacterFactory from './models/factories/game_character_factory';
import GameFactory from './models/factories/game_factory';
import GameMapFactory from './models/factories/game_map_factory';
import PlayerFactory from './models/factories/player_factory';
import SpecialtyFactory from './models/factories/specialty_factory';
import TextBlockFactory from './models/factories/text_block_factory';
import UserFactory from './models/factories/user_factory';

// Directive Imports
import abilityDirective from './directives/ability/directive';
import abilityModifierDirective from './directives/ability_modifier/directive';
import abilitySelectorDirective from './directives/ability_selector/directive';
import attributeDirective from './directives/attribute/directive';
import attributeModifierDirective from './directives/attribute_modifier/directive';
import characterAbilityDirective from './directives/character_ability/directive';
import characterAttributeDirective from './directives/character_attribute/directive';
import characterLinkFromDataDirective from './directives/character_link/from_data/directive';
import characterLinkGenericDirective from './directives/character_link/generic/directive';
import characterSheetFromDataDirective from './directives/character_sheet/from_data/directive';
import characterSheetFromIdDirective from './directives/character_sheet/from_id/directive';
import characterSheetGenericDirective from './directives/character_sheet/generic/directive';
import characterTraitDirective from './directives/character_trait_display/generic/directive';
import flawDirective from './directives/character_trait_display/flaw/directive';
import specialtyDirective from './directives/character_trait_display/specialty/directive';
import checkContextSelectorDirective from './directives/check_context_selector/directive';
import diceRollerDirective from './directives/dice_roller/directive';
import dieDirective from './directives/die/directive';
import gameDirective from './directives/game/directive';
import gameBoardDirective from './directives/game_board/directive';
import gameToolkitDirective from './directives/game_toolkit/directive';
import modalDirective from './directives/modal/directive';
import playerPanelDirective from './directives/player_panel/directive';


let module = angular.module('chaffers', [
    djangular.name,
    'isteven-multi-select',
    'ui.bootstrap'
]);

// Controllers
module.controller('loginController', LoginController);

// Factories
module.factory('Ability', AbilityFactory);
module.factory('AbilityModifier', AbilityModifierFactory);
module.factory('Attribute', AttributeFactory);
module.factory('AttributeModifier', AttributeModifierFactory);
module.factory('ChaffersModel', ChaffersModelFactory);
module.factory('Character', CharacterFactory);
module.factory('CharacterTrait', CharacterTraitFactory);
module.factory('CheckContext', CheckContextFactory);
module.factory('Flaw', FlawFactory);
module.factory('GameBoardPosition', GameBoardPositionFactory);
module.factory('GameCharacter', GameCharacterFactory);
module.factory('Game', GameFactory);
module.factory('GameMap', GameMapFactory);
module.factory('Player', PlayerFactory);
module.factory('Specialty', SpecialtyFactory);
module.factory('TextBlock', TextBlockFactory);
module.factory('User', UserFactory);

// Directives
module.directive('ability', abilityDirective);
module.directive('abilityModifier', abilityModifierDirective);
module.directive('abilitySelector', abilitySelectorDirective);
module.directive('attribute', attributeDirective);
module.directive('attributeModifier', attributeModifierDirective);
module.directive('characterAbility', characterAbilityDirective);
module.directive('characterAttribute', characterAttributeDirective);
module.directive('characterLinkFromData', characterLinkFromDataDirective);
module.directive('characterLink', characterLinkGenericDirective);
module.directive('characterSheetFromData', characterSheetFromDataDirective);
module.directive('characterSheetFromId', characterSheetFromIdDirective);
module.directive('characterSheet', characterSheetGenericDirective);
module.directive('characterTrait', characterTraitDirective);
module.directive('flaw', flawDirective);
module.directive('specialty', specialtyDirective);
module.directive('checkContextSelector', checkContextSelectorDirective);
module.directive('diceRoller', diceRollerDirective);
module.directive('die', dieDirective);
module.directive('game', gameDirective);
module.directive('gameBoard', gameBoardDirective);
module.directive('gameToolkit', gameToolkitDirective);
module.directive('modal', modalDirective);
module.directive('playerPanel', playerPanelDirective);

export default module;
