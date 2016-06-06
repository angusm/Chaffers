from django.db.models import IntegerField
from django.db.models import Model
from ..libraries.dictable import Dictable


class GameBoardPosition(Model, Dictable):
    x = IntegerField(default=0)
    y = IntegerField(default=0)
