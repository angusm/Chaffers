from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution


class CharacterTrait(TextSubstitution):
    name = CharField(max_length=255)
    description = ForeignKey('TextBlock',)
    ability_modifiers = ManyToManyField(
        'AbilityModifier',
        blank=True
    )
    attribute_modifiers = ManyToManyField(
        'AttributeModifier',
        blank=True
    )

    class Meta(object):
        ordering = ['name']

    def __unicode__(self):
        return '{name}'.format(name=self.name)
