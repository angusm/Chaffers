from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model


class GlossaryTerm(Model):
    term = CharField(max_length=255)
    definition = TextField()

    def __unicode__(self):
        return '{term}'.format(name=self.term)