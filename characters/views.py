from resources.models import *
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from resources.render_chaffers import render_chaffers
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
