from django.contrib import admin
from resources.models import Specialty
from character_trait_admin import CharacterTraitAdmin


# Setup Admin models
@admin.register(Specialty)
class SpecialtyAdmin(CharacterTraitAdmin):
    pass

