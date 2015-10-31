from django.contrib import admin
from resources.models import Ability


# Setup Admin models
class AbilityAdmin(admin.ModelAdmin):

    fields = ('name',
              'description',
              'parent_ability',
              'categories',)

    list_display = ('display_name', 'description',)
    search_fields = ('name',)

admin.site.register(Ability, AbilityAdmin)