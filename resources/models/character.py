from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Character(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting', blank=True)
    locations = ManyToManyField('Location', blank=True)
    adventures = ManyToManyField('Adventure', blank=True)
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)
