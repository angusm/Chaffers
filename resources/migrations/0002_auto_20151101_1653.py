# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='textblock',
            old_name='raw_description',
            new_name='raw_text',
        ),
    ]
