from .character import Character
from django.db.models import ForeignKey
from django.db.models import IntegerField


class GameCharacter(Character):
    game = ForeignKey('Game')
    x_position = IntegerField(default=0)
    y_position = IntegerField(default=0)
    z_position = IntegerField(default=0)
