from django.db.models import Model
from django.db.models import CharField
from ..libraries import Dictable


class TextSubstitution(Model, Dictable):
    text_substitution_label = CharField(
        max_length=255,
        unique=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    def __unicode__(self):
        return self.display_name
