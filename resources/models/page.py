from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model


class Page(Model):
    name = CharField(max_length=255)
    description = TextField()

    def __unicode__(self):
        return '{name}'.format(name=self.name)