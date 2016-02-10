from django.db.models import TextField
from django.db.models import Model
from ..libraries import Dictable


class TextBlock(Model, Dictable):
    raw_text = TextField()

    @property
    def formatted_text(self):
        return self.raw_text

    def __str__(self):
        max_length = 30
        text = self.raw_text
        if len(text) > max_length:
            return '{stub}...'.format(
                stub=text[0:(max_length-3)]
            )
        else:
            return text
