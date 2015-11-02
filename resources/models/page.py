from django.db.models import ForeignKey
from .text_substitution import TextSubstitution
from ..libraries import Dictable


class Page(TextSubstitution, Dictable):
    description = ForeignKey('TextBlock')

