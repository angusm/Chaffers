from django.db.models import IntegerField
from django.db.models import ForeignKey
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Attribute(TextSubstitution, Dictable):

    base_value = IntegerField()
    description = ForeignKey('TextBlock', blank=True, null=True)
