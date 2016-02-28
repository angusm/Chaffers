from django.db.models import TextField
from django.db.models import Model
from .text_substitution import TextSubstitution
from ..libraries import Dictable
import re


class TextBlock(Model, Dictable):
    raw_text = TextField()

    @property
    def formatted_text(self):
        """
        Function to return the formatted text block
        :return:
        """

        text_sub_dict = TextSubstitution.get_label_to_display_dict()
        formatted_text = self.raw_text
        for substitution_label, display_name in text_sub_dict.items():
            formatted_text = re.sub(substitution_label, display_name, formatted_text)

        return formatted_text

    def __str__(self):
        max_length = 30
        text = self.raw_text
        if len(text) > max_length:
            return '{stub}...'.format(
                stub=text[0:(max_length-3)]
            )
        else:
            return text
