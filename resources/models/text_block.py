from django.db.models import TextField
from django.db.models import Model
from ..libraries import Dictable


class TextBlock(Model, Dictable):
    raw_text = TextField()

    @property
    def formatted_text(self):
        return self.raw_text
