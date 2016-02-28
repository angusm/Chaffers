from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries import Dictable


class CharacterTrait(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock', null=True, blank=True)
    ability_modifiers = ManyToManyField(
        'AbilityModifier',
        blank=True
    )
    attribute_modifiers = ManyToManyField(
        'AttributeModifier',
        blank=True
    )

    class Meta(object):
        ordering = ['display_name']

