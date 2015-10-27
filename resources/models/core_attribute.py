from django.db.models import CharField
from django.db.models import TextField
from django.db.models import Model


class CoreAttribute(Model):
    name = CharField(max_length=255)
    description = TextField()
    internal_code = CharField(max_length=255)

    # INTERNAL CODE NAME
    MENTAL_INTERNAL_CODE = 'mental'
    PHYSICAL_INTERNAL_CODE = 'physical'

    def __unicode__(self):
        return '{name}'.format(name=self.name)
