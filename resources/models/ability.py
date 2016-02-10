from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .self_referencing_text_substitution import SelfReferencingTextSubstitution
from ..libraries.dictable import Dictable


class Ability(SelfReferencingTextSubstitution, Dictable):

    description = ForeignKey('TextBlock')
    categories = ManyToManyField('Category',)

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        must_update_children = self.has_outdated_saved_display_name()
        super(Ability, self).save()
        if must_update_children:
            for child in self.ability_modifier_set.all():
                child.save()
