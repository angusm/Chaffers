from django.views.decorators.http import require_POST
from resources.models import Attribute
from django.http.response import JsonResponse


@require_POST
def get_all_attributes_data(request):
    """
    Get the character data for the given character
    """

    attributes = Attribute.objects.all()
    properties_to_dict = [
        'id',
        'base_value',
        'display_name',
        'description__formatted_text',
    ]
    attributes_data = [a.to_dict(*properties_to_dict) for a in attributes]

    return JsonResponse({
        'attributes_data': attributes_data
    })
