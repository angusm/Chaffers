from django.db.models import ForeignKey
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import Model
from django.db.models import CharField
from ..libraries.dictable import Dictable


class AbilityModifier(Model, Dictable):
    ability = ForeignKey('Ability')
    modifier = IntegerField()
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    class Meta(object):
        ordering = ['display_name']

    def get_display_name(self):
        return '{ability} {modifier}'.format(
            modifier=self.modifier,
            ability=self.ability.display_name
        )

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        self.display_name = self.get_display_name()
        super(AbilityModifier, self).save()

    def __unicode__(self):
        return self.get_display_name()
