from django.contrib.auth.models import User
from django.db.models import Model
from django.db.models import OneToOneField
from django.db.models import CharField
from django.db.models import ManyToManyField
from ..libraries import Dictable


class Player(Model, Dictable):
    user = OneToOneField(User, unique=True)
    username = CharField(max_length=255, default='Player')
    mastered_games = ManyToManyField('Game')

    @classmethod
    def get_by_user(cls, user):
        player, created = Player.objects.get_or_create(
            user_id=user.id,
            defaults={
                'username': user.username
            }
        )
        return player
