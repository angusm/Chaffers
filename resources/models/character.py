from django.db.models import PositiveIntegerField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ManyToManyField
from django.db.models import Model


class Character(Model):
    name = CharField(max_length=255)
    description = TextField()
    physical_score = PositiveIntegerField()
    mental_score = PositiveIntegerField()
    campaign_settings = ManyToManyField('CampaignSetting',)
    locations = ManyToManyField('Location',)
    adventures = ManyToManyField('Adventure',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)