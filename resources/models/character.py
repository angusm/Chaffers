from django.db.models import PositiveIntegerField
from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ManyToManyField
from django.db.models import Model


class Character(Model):
    name = CharField(max_length=255)
    description = TextField()
    campaign_settings = ManyToManyField('CampaignSetting', blank=True)
    locations = ManyToManyField('Location', blank=True)
    adventures = ManyToManyField('Adventure', blank=True)
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)

    def __unicode__(self):
        return '{name}'.format(name=self.name)