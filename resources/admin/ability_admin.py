from django.contrib import admin


# Setup Admin models
class AbilityAdmin(admin.ModelAdmin):
    fields = ('name',
              'description',
              'parent_ability',
              'categories',
              'core_attributes',)
    list_display = ('name', 'description',)
    search_fields = ('name',)
