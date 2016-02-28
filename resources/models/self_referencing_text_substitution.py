from django.db.models import CharField
from django.db.models import ForeignKey
from .text_substitution import TextSubstitution


class SelfReferencingTextSubstitution(TextSubstitution):

    name = CharField(max_length=255)
    parent = ForeignKey('self', null=True, blank=True, )

    class Meta(object):
        ordering = ['display_name']
        abstract = True

    def has_outdated_saved_display_name(self):
        """
        Check if the current instance has a display name that should be updated
        """

        # New objects can't be outdated
        if self.pk is None:
            return False

        # Return false if the currently saved value doesn't match
        # the calculated display name
        clean_copy = type(self).objects.get(pk=self.pk)
        if clean_copy.display_name == self.get_calculated_display_name():
            return False

        return True

    def __update_display_names(self):
        """
        Update the display name of the instance, returning True if the name changed
        """

        # Look for a reason not to save
        must_save = self.has_outdated_saved_display_name()

        self.display_name = self.get_calculated_display_name()
        return must_save

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        must_update_children = self.__update_display_names()
        super(SelfReferencingTextSubstitution, self).save()
        if must_update_children:
            for child in type(self).objects.filter(parent=self):
                child.save()

    def get_calculated_display_name(self):
        """
        Returns a display name for the ability that factors in parent ability names
        """
        base_name = '{name}'.format(name=self.name)
        if self.parent is not None:
            return '{parent_name} ({base_name})'.format(
                parent_name=self.parent.display_name,
                base_name=base_name
            )
        else:
            return base_name
