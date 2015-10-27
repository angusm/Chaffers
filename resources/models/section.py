from django.db.models import CharField
from django.db.models import TextField
from django.db.models import ForeignKey
from django.db.models import Model


class Section(Model):
    name = CharField(max_length=255)
    text = TextField()
    parent_section = ForeignKey('self')

    def __unicode__(self):
        return '{name}'.format(name=self.name)
