from django.contrib import admin
from resources.models import Character


# Setup Admin models
@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):

    fields = ('display_name',
              'text_substitution_label',
              'description',
              'specialties',
              'flaws',)
    filter_horizontal = ('specialties',
                         'flaws',)

    list_display = ('display_name', 'description',)
    search_fields = ('display_name',)

