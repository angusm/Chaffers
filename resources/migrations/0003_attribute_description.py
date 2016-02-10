# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0002_auto_20160209_1953'),
    ]

    operations = [
        migrations.AddField(
            model_name='attribute',
            name='description',
            field=models.ForeignKey(blank=True, to='resources.TextBlock', null=True),
        ),
    ]
