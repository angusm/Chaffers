from django.contrib import admin

from ..models import Ability
from ..models import AbilityModifier
from ..models import Adventure
from ..models import CampaignSetting
from ..models import Category
from ..models import Character
from ..models import CoreAttribute
from ..models import Flaw
from ..models import GlossaryTerm
from ..models import Location
from ..models import Page
from ..models import Section
from ..models import Specialty

from ability_admin import AbilityAdmin


# Register your models here.
admin.site.register(Ability, AbilityAdmin)
admin.site.register(AbilityModifier)
admin.site.register(Adventure)
admin.site.register(CampaignSetting)
admin.site.register(Category)
admin.site.register(Character)
admin.site.register(CoreAttribute)
admin.site.register(Flaw)
admin.site.register(GlossaryTerm)
admin.site.register(Location)
admin.site.register(Page)
admin.site.register(Section)
admin.site.register(Specialty)
