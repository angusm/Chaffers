from django.shortcuts import render
from resources.models import Player
import json


def render_chaffers(request, template_name, context=None):
    """
    Renders a chaffers template providing player context
    :param request:
    :param template_name:
    :param context:
    :return:
    """

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