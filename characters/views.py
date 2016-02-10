from django.shortcuts import render
from resources.models import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

# Create your views here.
def view_character_list(request):
    """ Show a list of characters
    """

    characters_data = Character.objects.values('id', 'display_name')

    return render(
        request,
        'character_list.html',
        {'character_data': [json.dumps(character_data) for character_data in characters_data]}
    )


def view_character(request, character_id):

    character = Character.objects.get(
        pk=character_id
    )
    character_data = character.to_dict(
        'display_name',
        'description__formatted_text',

        'specialties__display_name',
        'specialties__description__formatted_text',
        'specialties__ability_modifiers__ability_id',
        'specialties__ability_modifiers__modifier',
        'specialties__attribute_modifiers__attribute_id',
        'specialties__attribute_modifiers__display_name',
        'specialties__attribute_modifiers__modifier',

        'flaws__display_name',
        'flaws__description__formatted_text',
        'flaws__ability_modifiers__ability_id',
        'flaws__ability_modifiers__modifier',
        'flaws__attribute_modifiers__attribute_id',
        'flaws__attribute_modifiers__display_name',
        'flaws__attribute_modifiers__modifier',
    )

    return render(
        request,
        'character_sheet.html',
        {'character_data': json.dumps(character_data)}
    )


@require_POST
def get_character_data(request):

    character_id = 323542
    character = Character.objects.get(pk=character_id)
    character_data = character.to_dict(
        'display_name',
        'description__formatted_text',

        'specialties__display_name',
        'specialties__description__formatted_text',
        'specialties__ability_modifiers__ability_id',
        'specialties__ability_modifiers__modifier',
        'specialties__attribute_modifiers__attribute_id',
        'specialties__attribute_modifiers__modifier',

        'flaws__display_name',
        'flaws__description__formatted_text',
        'flaws__ability_modifiers__ability_id',
        'flaws__ability_modifiers__modifier',
        'flaws__attribute_modifiers__attribute_id',
        'flaws__attribute_modifiers__display_name',
        'flaws__attribute_modifiers__modifier',
    )

    return JsonResponse({
        'success': True,
        'character_data': character_data,
    })


@require_POST
def get_ability_data(request):

    abilities = Ability.objects.all()
    ability_data = Ability.to_dict_queryset(
        queryset=abilities,
        fields=[
            'id',
            'display_name',
            'parent_ability_id',
        ]
    )

    return JsonResponse({
        'success': True,
        'ability_data': ability_data,
    })
