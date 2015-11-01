from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution


class CampaignSetting(TextSubstitution):
    name = CharField(max_length=255)
    description = ForeignKey('TextBlock',)
    adventures = ManyToManyField('Adventure', blank=True)
    characters = ManyToManyField('Character', blank=True)
    locations = ManyToManyField('Location', blank=True)

    def __unicode__(self):
        return '{name}'.format(name=self.name)