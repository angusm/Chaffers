from resources.models import Game
from resources.views import render_chaffers
from django.http import JsonResponse
import json


# Create your views here.
def view(request, game_id):
    """
    Show the game with the given ID
    """
    return render_chaffers(
        request,
        'games/view.html',
        {'game_id': game_id}
    )


def get_data_by_id(request):
    """
    Return the data for the game with the DI given in the request
    :param request:
    :return:
    """

    request_data = json.loads(request.body)
    character = Game.objects.get(
        pk=request_data['game_id']
    )

    properties_to_dict = [
        'display_name',
        'description__formatted_text',

        'game_maps__id',
    ]
    game_data = character.to_dict(*properties_to_dict)

    return JsonResponse({
        'game_data': game_data
    })


def view_all(request):
    """
    Show the game with the given ID
    """
    return render_chaffers(
        request,
        'django_model_table.html',
        {'model_name': 'Game'}
    )


def get_all_games_data(request):
    pass
