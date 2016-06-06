from .character import Character
from django.db.models import ForeignKey


class GameCharacter(Character):
    game = ForeignKey('Game')
    position = ForeignKey('GameBoardPosition')
