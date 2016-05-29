from django.db.models import ManyToManyField
from django.db.models import Model
from ..libraries import Dictable


class Map(Model, Dictable):
    campaign_settings = ManyToManyField('CampaignSetting')
    adventures = ManyToManyField('Adventure')
