from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution


class Adventure(TextSubstitution):
    name = CharField(max_length=255)
    description = ForeignKey('TextBlock')
    campaign_settings = ManyToManyField('CampaignSetting',)
    locations = ManyToManyField('Location',)
    characters = ManyToManyField('Character',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)
