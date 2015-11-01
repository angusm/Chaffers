from django.db.models import CharField
from django.db.models import IntegerField
from .text_substitution import TextSubstitution


class Attribute(TextSubstitution):

    name = CharField(max_length=255)
    base_value = IntegerField()

    def __unicode__(self):
        return '{name}'.format(name=self.name)
