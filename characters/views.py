from django.shortcuts import render
from resources.models import *

# Create your views here.
def view_character(request, character_id):

    character = Character.objects.get(pk=character_id)