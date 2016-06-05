from render_chaffers import render_chaffers
from django.http import JsonResponse
import json
import model_views


# Create your views here.
def get_class_by_name(class_name):
    """
    Returns the class with the given name
    :param class_name:
    :return:
    """
    class_module = __import__('resources.models', fromlist=[str(class_name)])
    return getattr(class_module, class_name)


def view_all(request, model_name):
    """
    Create a view listing out all of the models
    :param request:
    :param model_name:
    :return:
    """
    if model_name in model_views.view_methods:
        return model_views.view_all_methods[model_name](request)
    else:
        return render_chaffers(
            request,
            'django_model_table.html',
            {'model_name': model_name}
        )


def view(request, model_name, model_id):
    """
    Create a view showing information about the given model
    :param request:
    :param model_name:
    :param model_id:
    :return:
    """
    if model_name in model_views.view_methods:
        return model_views.view_methods[model_name](request, model_id)
    else:
        return render_chaffers(
            request,
            'django_model_view.html',
            {
                'model_name': model_name,
                'model_id': model_id
            }
        )


def get_all_ids(request):
    """
    Return all of the IDs for the given model
    :param request:
    :return:
    """
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

