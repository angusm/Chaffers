# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0009_auto_20151030_2311'),
    ]

    operations = [
        migrations.AddField(
            model_name='abilitymodifier',
            name='flaws',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
        migrations.AddField(
            model_name='attributemodifier',
            name='flaws',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
        migrations.AlterField(
            model_name='abilitymodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Specialty', blank=True),
        ),
        migrations.AlterField(
            model_name='attributemodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Specialty', blank=True),
        ),
    ]
