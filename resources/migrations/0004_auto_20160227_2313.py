# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0003_attribute_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='charactertrait',
            name='description',
            field=models.ForeignKey(blank=True, to='resources.TextBlock', null=True),
        ),
    ]
