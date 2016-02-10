from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .self_referencing_text_substitution import SelfReferencingTextSubstitution
from ..libraries.dictable import Dictable


class Ability(SelfReferencingTextSubstitution, Dictable):

    description = ForeignKey('TextBlock')
    categories = ManyToManyField('Category',)
