from django.contrib import admin


# Setup Admin models
class CharacterTraitAdmin(admin.ModelAdmin):

    fields = ('display_name',
              'text_substitution_label',
              'description',
              'ability_modifiers',
              'attribute_modifiers',)
    filter_horizontal = ('ability_modifiers',
                         'attribute_modifiers',)

    list_display = ('display_name', 'description',)
    search_fields = ('display_name',)

