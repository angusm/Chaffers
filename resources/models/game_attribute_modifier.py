from .attribute_modifier import AttributeModifier
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from django.db.models import BooleanField
from django.db.models import IntegerField


class GameAttributeModifier(AttributeModifier):
    game = ForeignKey('Game')
    targets = ManyToManyField('GameCharacter')
    expires = BooleanField(default=False)
    duration = IntegerField(default=0)
