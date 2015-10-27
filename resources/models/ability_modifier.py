from django.db.models import ForeignKey
from django.db.models import IntegerField
from django.db.models import ManyToManyField
from django.db.models import Model


class AbilityModifier(Model):
    ability = ForeignKey('Ability')
    modifier = IntegerField()
    specialties = ManyToManyField('Specialty',)
    specialties = ManyToManyField('Flaw',)
