from django.db.models import ForeignKey
from .text_substitution import TextSubstitution
from ..libraries import Dictable


class Category(TextSubstitution, Dictable):
    parent_category = ForeignKey('self', null=True, blank=True)