from django.contrib import admin
from resources.models import Ability


# Setup Admin models
@admin.register(Ability)
class AbilityAdmin(admin.ModelAdmin):

    fields = ('name',
              'text_substitution_label',
              'description',
              'parent',
              'categories',)

    list_display = ('display_name', 'description',)
    search_fields = ('name',)
