# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0002_auto_20151101_1532'),
    ]

    operations = [
        migrations.RenameField(
            model_name='textblock',
            old_name='description',
            new_name='raw_description',
        ),
    ]
