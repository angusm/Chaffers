from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Character(TextSubstitution, Dictable):
    name = CharField(max_length=255)
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting', blank=True)
    locations = ManyToManyField('Location', blank=True)
    adventures = ManyToManyField('Adventure', blank=True)
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)

    def __unicode__(self):
        return '{name}'.format(name=self.name)