from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ManyToManyField
from django.db.models import Model


class CampaignSetting(Model):
    name = CharField(max_length=255)
    description = TextField()
    adventures = ManyToManyField('Adventure', blank=True)
    characters = ManyToManyField('Character', blank=True)
    locations = ManyToManyField('Location', blank=True)

    def __unicode__(self):
        return '{name}'.format(name=self.name)