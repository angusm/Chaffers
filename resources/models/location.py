from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution


class Location(TextSubstitution):
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting',)
    adventures = ManyToManyField('Adventure',)
    characters = ManyToManyField('Character',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)