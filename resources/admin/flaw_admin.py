from django.contrib import admin
from resources.models import Flaw


# Setup Admin models
@admin.register(Flaw)
class FlawAdmin(admin.ModelAdmin):

    fields = ('name',
              'description',
              'ability_modifiers',
              'attribute_modifiers',)
    filter_horizontal = ('ability_modifiers',
                         'attribute_modifiers',)

    list_display = ('name', 'description',)
    search_fields = ('name',)

