from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model
from django.db.models import ManyToManyField


class Adventure(Model):
    name = CharField(max_length=255)
    description = TextField()
    campaign_settings = ManyToManyField('CampaignSetting',)
    locations = ManyToManyField('Location',)
    characters = ManyToManyField('Character',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)
