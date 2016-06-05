from .character import Character
from django.db.models import ForeignKey


class GameCharacter(Character):
    game = ForeignKey('Game', related_name='game_characters')
    position = ForeignKey('Position2d')
