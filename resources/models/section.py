from django.db.models import ForeignKey
from ..libraries import Dictable
from .text_substitution import TextSubstitution


class Section(TextSubstitution, Dictable):
    text = ForeignKey('TextBlock')
    parent_section = ForeignKey('self')

    def __unicode__(self):
        return '{name}'.format(name=self.name)
