from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from django.db.models import Model
from ..libraries import Dictable


class Game(Model, Dictable):
    description = ForeignKey('TextBlock')
    game_masters = ManyToManyField('Player')
