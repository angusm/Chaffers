# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0005_ability_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='attributemodifier',
            name='display_name',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='attributemodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
    ]
