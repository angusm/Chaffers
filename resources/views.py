from django.shortcuts import render
from resources.models import Player
import json


# Create your views here.
def render_chaffers(request, template_name, context=None):

    is_authenticated = request.user.is_authenticated()

    player_data = {}
    if is_authenticated:
        player = Player.get_by_user(request.user)
        player_properties = [
            'username',
        ]
        player_data = player.to_dict(*player_properties)

    context['player_data'] = json.dumps(player_data)
    context['is_authenticated'] = is_authenticated
    return render(
        request,
        template_name,
        context
    )
