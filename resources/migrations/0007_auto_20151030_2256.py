# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0006_auto_20151030_2231'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ability',
            options={'ordering': ['display_name']},
        ),
        migrations.AlterModelOptions(
            name='abilitymodifier',
            options={'ordering': ['display_name']},
        ),
        migrations.AlterModelOptions(
            name='charactertrait',
            options={'ordering': ['name']},
        ),
        migrations.AddField(
            model_name='abilitymodifier',
            name='display_name',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='abilitymodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
    ]
