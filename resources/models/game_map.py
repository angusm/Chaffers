from django.db.models import ForeignKey
from .map import Map


class GameMap(Map):
    game = ForeignKey('Game')
