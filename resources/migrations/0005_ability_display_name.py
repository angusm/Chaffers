# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0004_auto_20151030_2134'),
    ]

    operations = [
        migrations.AddField(
            model_name='ability',
            name='display_name',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
