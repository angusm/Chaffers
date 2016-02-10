from django.db.models import ForeignKey
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import Model
from django.db.models import CharField
from ..libraries.dictable import Dictable
from ..libraries.chaffers_utilities import modifier_value_to_string


class AbilityModifier(Model, Dictable):
    ability = ForeignKey('Ability')
    modifier = IntegerField()
    specialties = ManyToManyField('Specialty', blank=True)
    flaws = ManyToManyField('Flaw', blank=True)
    display_name = CharField(max_length=255, null=True, blank=True)
    check_contexts = ManyToManyField('CheckContext', blank=True)

    class Meta(object):
        ordering = ['display_name']

    def get_display_name(self):
        base_name = '{modifier} {ability}'.format(
            modifier=modifier_value_to_string(self.modifier),
            ability=self.ability.display_name
        )

        if len(self.check_contexts.all()) > 0:
            context_names = [context.display_name for context in self.check_contexts.all()]
            name_with_context = '{base_name} ({contexts})'.format(
                base_name=base_name,
                contexts=', '.join(context_names)
            )
        else:
            name_with_context = base_name

        return name_with_context

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        self.display_name = self.get_display_name()
        super(AbilityModifier, self).save()

    def __unicode__(self):
        return self.display_name
