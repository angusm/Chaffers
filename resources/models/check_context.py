from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .self_referencing_text_substitution import SelfReferencingTextSubstitution
from ..libraries.dictable import Dictable


class CheckContext(SelfReferencingTextSubstitution, Dictable):
    """ Class to manage a context in which a player might make
    a roll/check
    """

    description = ForeignKey('TextBlock', null=True, blank=True)
    ability_modifiers = ManyToManyField('AbilityModifier', blank=True)

    class Meta(object):
        ordering = ['display_name']

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        must_update_children = self.has_outdated_saved_display_name()
        super(CheckContext, self).save()
        if must_update_children:
            for ability_modifier in self.ability_modifiers.all():
                ability_modifier.save()

