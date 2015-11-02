from django.db.models import CharField
from django.db.models import ForeignKey
from django.db.models import ManyToManyField
from .text_substitution import TextSubstitution
from ..libraries.dictable import Dictable


class Ability(TextSubstitution, Dictable):
    name = CharField(max_length=255)
    description = ForeignKey('TextBlock')
    parent_ability = ForeignKey('self', null=True, blank=True, )
    categories = ManyToManyField('Category',)

    class Meta(object):
        ordering = ['display_name']

    def __update_display_names(self):
        """
        Update the display name of the instance, returning True if the name changed
        """

        # Look for a reason not to save
        must_save = True

        # New objects don't need to update children
        if self.pk is not None:
            clean_copy = type(self).objects.get(pk=self.pk)
            if clean_copy.display_name == self.get_calculated_display_name():
                must_save = False
        else:
            must_save = False

        self.display_name = self.get_calculated_display_name()
        return must_save

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        must_update_children = self.__update_display_names()
        super(Ability, self).save()
        if must_update_children:
            for child in self.ability_set.all():
                child.save()
            for child in self.ability_modifier_set.all():
                child.save()

    def get_calculated_display_name(self):
        """
        Returns a display name for the ability that factors in parent ability names
        """
        base_name = '{name}'.format(name=self.name)
        if self.parent_ability is not None:
            return '{parent_name} ({base_name})'.format(
                parent_name=self.parent_ability.display_name,
                base_name=base_name
            )
        else:
            return base_name
