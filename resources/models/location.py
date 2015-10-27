from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ManyToManyField
from django.db.models import Model


class Location(Model):
    name = CharField(max_length=255)
    description = TextField()
    campaign_settings = ManyToManyField('CampaignSetting',)
    adventures = ManyToManyField('Adventure',)
    characters = ManyToManyField('Character',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)