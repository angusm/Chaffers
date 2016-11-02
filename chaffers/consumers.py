from django.http import HttpResponse
from channels.handler import AsgiHandler
from resources.libraries.dictable.dictable import Dictable

from channels import Group
import json

def get_class_by_name(class_name):
    """
    Returns the class with the given name
    :param class_name:
    :return:
    """
    class_module = __import__('resources.models', fromlist=[str(class_name)])
    return getattr(class_module, class_name)


def ws_add(message):
    message_data = json.loads(message.content['text'])


def ws_message(message):
    # ASGI WebSocket packet-received and send-packet message types
    # both have a "text" key for their textual data.
    message_data = json.loads(message.content['text'])

    group_name = '__'.join([
        str(message_data['model_name']),
        str(message_data['id']),
        str(message_data['field_name']),
    ])
    Group(group_name).add(message.reply_channel)

    target_class = get_class_by_name(message_data['model_name'])
    raw_value = target_class.objects.get(pk=message_data['id']).to_dict(
        message_data['field_name'])
    value = raw_value[message_data['field_name']]

    message.reply_channel.send({
        'text': json.dumps({
            'data': value,
            'field_name': message_data['field_name'],
            'id': message_data['id'],
            'model_name': message_data['model_name'],
        })
    })
