# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='textblock',
            name='abilities',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='adventures',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='attributes',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='campaign_settings',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='characters',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='flaws',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='glossary_terms',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='locations',
        ),
        migrations.RemoveField(
            model_name='textblock',
            name='specialties',
        ),
    ]
