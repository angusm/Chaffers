from resources.models import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from resources.views import render_chaffers
import json

# Create your views here.
def view_character_list(request):
    """ Show a list of characters
    """

    characters_data = Character.objects.values('id', 'display_name')

    return render_chaffers(
        request,
        'character_list.html',
        {'character_data': [json.dumps(character_data) for character_data in characters_data]}
    )


def view_character_sheet(request, character_id):
    """
    Show the character sheet for the given character
    """
    return render_chaffers(
        request,
        'character_sheet.html',
        {'character_id': character_id}
    )


@require_POST
def get_character_data_by_id(request):
    """
    Get the character data for the given character
    """

    request_data = json.loads(request.body)
    character = Character.objects.get(
        pk=request_data['character_id']
    )
    properties_to_dict = [
        'display_name',
        'description__formatted_text',

        'specialties__display_name',
        'specialties__description__formatted_text',

        'specialties__ability_modifiers__ability_id',
        'specialties__ability_modifiers__display_name',
        'specialties__ability_modifiers__modifier',
        'specialties__ability_modifiers__check_contexts__id',

        'specialties__attribute_modifiers__attribute_id',
        'specialties__attribute_modifiers__display_name',
        'specialties__attribute_modifiers__modifier',

        'flaws__display_name',
        'flaws__description__formatted_text',

        'flaws__ability_modifiers__ability_id',
        'flaws__ability_modifiers__display_name',
        'flaws__ability_modifiers__modifier',
        'flaws__ability_modifiers__check_contexts__id',

        'flaws__attribute_modifiers__attribute_id',
        'flaws__attribute_modifiers__display_name',
        'flaws__attribute_modifiers__modifier',
    ]
    character_data = character.to_dict(*properties_to_dict)

    return JsonResponse({
        'character_data': character_data
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
