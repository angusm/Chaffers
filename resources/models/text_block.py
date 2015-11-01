from django.db.models import TextField
from django.db.models import Model
from django.db.models import ManyToManyField


class TextBlock(Model):
    raw_description = TextField()
