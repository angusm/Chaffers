from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from django.db.models import Model
from ..libraries import Dictable


class Game(Model, Dictable):

    display_name = CharField(max_length=255)
    description = ForeignKey('TextBlock')
    game_masters = ManyToManyField('Player')
