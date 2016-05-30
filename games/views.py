from django.shortcuts import render
from resources.models import Game
from resources.views import render_chaffers


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


def view_all(request):
    pass


def get_all_games_data(request):
    pass
