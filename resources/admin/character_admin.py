from django.contrib import admin
from resources.models import Character


# Setup Admin models
class CharacterAdmin(admin.ModelAdmin):

    fields = ('name',
              'description',
              'specialties',
              'flaws',)
    admin.ModelAdmin.filter_horizontal = ('specialties',
                                          'flaws',)

    list_display = ('name', 'description',)
    search_fields = ('name',)

admin.site.register(Character, CharacterAdmin)
