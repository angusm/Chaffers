from django.db.models import Model
from django.db.models import CharField
from django.db.models import IntegerField


class Attribute(Model):

    name = CharField(max_length=255)
    base_value = IntegerField()

    def __unicode__(self):
        return '{name}'.format(name=self.name)
