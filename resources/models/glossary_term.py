from django.db.models import ForeignKey
from .text_substitution import TextSubstitution


class GlossaryTerm(TextSubstitution):
    definition = ForeignKey('TextBlock')

    def __unicode__(self):
        return '{term}'.format(name=self.term)