from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model
from django.db.models import ForeignKey
from django.db.models import ManyToManyField


class Ability(Model):
    name = CharField(max_length=255)
    description = TextField()
    parent_ability = ForeignKey('self', null=True, blank=True, )
    categories = ManyToManyField('Category',)
    display_name = CharField(max_length=255, null=True, blank=True)

    class Meta(object):
        ordering = ['display_name']

    def __update_display_names(self):
        """
        Update the display name of the instance, returning True if the name changed
        """
        clean_copy = type(self).objects.get(pk=self.pk)
        if clean_copy.display_name == self.get_calculated_display_name():
            return False

        self.display_name = self.get_calculated_display_name()
        return True

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

    def __unicode__(self):
        return self.display_name
