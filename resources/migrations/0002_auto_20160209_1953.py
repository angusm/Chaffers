# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkcontext',
            name='description',
            field=models.ForeignKey(blank=True, to='resources.TextBlock', null=True),
        ),
    ]
