from django.contrib import admin

from ..models import AbilityModifier
from ..models import Attribute
from ..models import AttributeModifier
from ..models import Adventure
from ..models import CampaignSetting
from ..models import Category
from ..models import GlossaryTerm
from ..models import Location
from ..models import Page
from ..models import Section

from .ability_admin import AbilityAdmin
from .character_admin import CharacterAdmin
from .specialty_admin import SpecialtyAdmin
from .flaw_admin import FlawAdmin

# Register your models here.
admin.site.register(AbilityModifier)
admin.site.register(Attribute)
admin.site.register(AttributeModifier)
admin.site.register(Adventure)
admin.site.register(CampaignSetting)
admin.site.register(Category)
admin.site.register(GlossaryTerm)
admin.site.register(Location)
admin.site.register(Page)
admin.site.register(Section)
