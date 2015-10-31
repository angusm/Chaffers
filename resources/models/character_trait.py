from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ManyToManyField
from django.db.models import Model


class CharacterTrait(Model):
    name = CharField(max_length=255)
    description = TextField()
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
