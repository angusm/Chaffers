from django.db.models import ForeignKey
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import Model
from django.db.models import CharField


class AttributeModifier(Model):
    attribute = ForeignKey('Attribute')
    modifier = IntegerField()
    specialties = ManyToManyField('Specialty', blank=True)
    specialties = ManyToManyField('Flaw', blank=True)
    display_name = CharField(max_length=255, null=True, blank=True)

    def get_display_name(self):
        return '{modifier} {attribute}'.format(
            modifier=self.modifier,
            attribute=self.attribute.name
        )

    def save(self):
        """
        Save override to keep display names up to date
        """
        # Handle updating display names
        self.display_name = self.get_display_name()
        super(AttributeModifier, self).save()

    def __unicode__(self):
        return self.get_display_name()
