from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries import Dictable


class Location(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting',)
    adventures = ManyToManyField('Adventure',)
    characters = ManyToManyField('Character',)
