from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.http.response import JsonResponse
import json
from resources.models import Player


# Create your views here.
def login_player(request):

    request_data = json.loads(request.body)

    from pprint import pprint
    pprint(request_data)

    username = request_data['username']
    password = request_data['password']

    user = authenticate(username=username, password=password)

    error_messages = []
    player_data = {}

    if user is None:
        error_messages.append('No such username')
    elif not user.is_active:
        error_messages.append('Account suspended')
    else:
        login(request, user)
        player = Player.get_by_user(request.user)
        player_properties = [
            'username',
        ]
        player_data = player.to_dict(*player_properties)

    success = len(error_messages) == 0

    return JsonResponse({
        'success': success,
        'error_messages': error_messages,
        'player_data': player_data,
    })


def logout_player(request):
    """
    Logs out the currently logged in player
    :param request:
    :return:
    """
    logout(request)
    return JsonResponse({
        'success': True
    })
