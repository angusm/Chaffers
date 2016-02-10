from django.db.models import ForeignKey
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import Model
from django.db.models import CharField
from ..libraries import Dictable


class AttributeModifier(Model, Dictable):
    attribute = ForeignKey('Attribute')
    modifier = IntegerField()
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    def get_display_name(self):
        return '{modifier} {attribute}'.format(
            modifier=self.get_plus_minus_modifier_string(),
            attribute=self.attribute.display_name
        )

    def get_plus_minus_modifier_string(self):

        if self.modifier > 0:
            sign = '+'
        else:
            sign = '-'

        return '{sign}{modifier}'.format(
            sign=sign,
            modifier=self.modifier
        )

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        self.display_name = self.get_display_name()
        super(AttributeModifier, self).save()

    def __unicode__(self):
        return self.get_display_name()
