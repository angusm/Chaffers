from django.views.decorators.http import require_POST
from resources.models import CheckContext
from django.http.response import JsonResponse


@require_POST
def get_all_check_contexts_data(request):
    """
    Get the character data for the given character
    """

    check_contexts = CheckContext.objects.all()
    properties_to_dict = [
        'id',
        'base_value',
        'display_name',
        'description__formatted_text',
    ]
    check_contexts_data = [c.to_dict(*properties_to_dict) for c in check_contexts]

    return JsonResponse({
        'check_contexts_data': check_contexts_data
    })
