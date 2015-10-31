# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0007_auto_20151030_2256'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='character',
            name='mental_score',
        ),
        migrations.RemoveField(
            model_name='character',
            name='physical_score',
        ),
        migrations.AlterField(
            model_name='campaignsetting',
            name='adventures',
            field=models.ManyToManyField(to='resources.Adventure', blank=True),
        ),
        migrations.AlterField(
            model_name='campaignsetting',
            name='characters',
            field=models.ManyToManyField(to='resources.Character', blank=True),
        ),
        migrations.AlterField(
            model_name='campaignsetting',
            name='locations',
            field=models.ManyToManyField(to='resources.Location', blank=True),
        ),
    ]
