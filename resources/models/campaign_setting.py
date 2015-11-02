from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries import Dictable


class CampaignSetting(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock',)
    adventures = ManyToManyField('Adventure', blank=True)
    characters = ManyToManyField('Character', blank=True)
    locations = ManyToManyField('Location', blank=True)
