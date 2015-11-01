from django.db.models import ForeignKey
from .text_substitution import TextSubstitution


class Page(TextSubstitution):
    description = ForeignKey('TextBlock')

    def __unicode__(self):
        return '{display_name}'.format(name=self.display_name)
