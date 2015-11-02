from django.contrib import admin
from resources.models import Flaw
from character_trait_admin import CharacterTraitAdmin


# Setup Admin models
@admin.register(Flaw)
class FlawAdmin(CharacterTraitAdmin):
    pass

