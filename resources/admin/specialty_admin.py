from django.contrib import admin
from resources.models import Specialty


# Setup Admin models
@admin.register(Specialty)
class SpecialtyAdmin(admin.ModelAdmin):

    fields = ('name',
              'description',
              'ability_modifiers',
              'attribute_modifiers',)
    filter_horizontal = ('ability_modifiers',
                         'attribute_modifiers',)

    list_display = ('name', 'description',)
    search_fields = ('name',)

