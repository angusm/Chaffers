from django.contrib import admin

from ..models import AbilityModifier
from ..models import Attribute
from ..models import AttributeModifier
from ..models import Adventure
from ..models import CampaignSetting
from ..models import Category
from ..models import CheckContext
from ..models import Game
from ..models import GameAttributeModifier
from ..models import GameCharacter
from ..models import GameMap
from ..models import GlossaryTerm
from ..models import Location
from ..models import Page
from ..models import Player
from ..models import Section
from ..models import TextBlock
from ..models import TextSubstitution

# Register your models here.
admin.site.register(AbilityModifier)
admin.site.register(Attribute)
admin.site.register(AttributeModifier)
admin.site.register(Adventure)
admin.site.register(CampaignSetting)
admin.site.register(Category)
admin.site.register(CheckContext)
admin.site.register(Game)
admin.site.register(GameAttributeModifier)
admin.site.register(GameCharacter)
admin.site.register(GameMap)
admin.site.register(GlossaryTerm)
admin.site.register(Location)
admin.site.register(Page)
admin.site.register(Player)
admin.site.register(Section)
admin.site.register(TextBlock)
admin.site.register(TextSubstitution)

from .ability_admin import AbilityAdmin
from .character_admin import CharacterAdmin
from .specialty_admin import SpecialtyAdmin
from .flaw_admin import FlawAdmin

