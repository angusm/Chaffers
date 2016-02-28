from django.db.models import Model
from django.db.models import CharField
from ..libraries import Dictable


class TextSubstitution(Model, Dictable):
    text_substitution_label = CharField(
        max_length=255,
        unique=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    @classmethod
    def get_label_to_display_dict(cls):
        """ Return the label to display name dictionary
        """
        dict_to_return = {}
        for text_sub in TextSubstitution.objects.all():
            dict_to_return[text_sub.text_substitution_label] = text_sub.display_name

        return dict_to_return

    def __unicode__(self):
        return self.display_name
