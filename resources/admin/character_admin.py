from django.contrib import admin
from resources.models import Character


# Setup Admin models
@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):

    fields = ('name',
              'description',
              'specialties',
              'flaws',)
    filter_horizontal = ('specialties',
                         'flaws',)

    list_display = ('name', 'description',)
    search_fields = ('name',)

