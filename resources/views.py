from django.shortcuts import render
from resources.models import Player
from django.http import JsonResponse
import json


# Create your views here.
def get_class_by_name(class_name):
    class_module = __import__('resources.models', fromlist=[str(class_name)])
    return getattr(class_module, class_name)


def get_all_ids(request):

    request_data = json.loads(request.body)
    class_name = request_data['model']

    ids = get_class_by_name(class_name).objects.values_list('id', flat=True);
    return JsonResponse({
        'ids': list(ids)
    })


def get_data_by_id(request):
    """
    Return data for the model with the given class and id
    :param request:
    :return:
    """

    request_data = json.loads(request.body)
    instance_id = request_data['id']
    class_name = request_data['model']
    fields = request_data['fields']

    instance = get_class_by_name(class_name).objects.get(pk=instance_id)

    data = instance.to_dict(*fields)
    return JsonResponse({
        'data': data
    })


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
