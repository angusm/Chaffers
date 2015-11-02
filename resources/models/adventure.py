from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Adventure(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting',)
    locations = ManyToManyField('Location',)
    characters = ManyToManyField('Character',)
