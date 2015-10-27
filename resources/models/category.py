from django.db.models import CharField
from django.db.models import Model
from django.db.models import ForeignKey


class Category(Model):
    name = CharField(max_length=255)
    internal_code = CharField(max_length=255)
    parent_category = ForeignKey('self', null=True, blank=True)

    def __unicode__(self):
        return '{name}'.format(name=self.name)