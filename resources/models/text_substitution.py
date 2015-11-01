from django.db.models import Model
from django.db.models import CharField


class TextSubstitution(Model):
    text_substitution_label = CharField(
        max_length=255,
        unique=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    def __unicode__(self):
        return self.text_substitution_label
