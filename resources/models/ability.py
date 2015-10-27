from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model
from django.db.models import ForeignKey
from django.db.models import ManyToManyField


class Ability(Model):
    name = CharField(max_length=255)
    description = TextField()
    parent_ability = ForeignKey('self', null=True, blank=True)
    categories = ManyToManyField('Category',)
    core_attributes = ManyToManyField('CoreAttribute',)

    def __unicode__(self):
        return '{name}'.format(name=self.name)
