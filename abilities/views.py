from django.views.decorators.http import require_POST
from resources.models import Ability
from django.http.response import JsonResponse


@require_POST
def get_all_abilities_data(request):
    """
    Get the character data for the given character
    """

    abilities = Ability.objects.all()
    properties_to_dict = [
        'display_name',
        'description__formatted_text',

        'category__display_name'
    ]
    abilities_data = [a.to_dict(*properties_to_dict) for a in abilities]

    return JsonResponse({
        'abilities_data': abilities_data
    })
