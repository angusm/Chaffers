from django.db.models import IntegerField
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Attribute(TextSubstitution, Dictable):

    base_value = IntegerField()
