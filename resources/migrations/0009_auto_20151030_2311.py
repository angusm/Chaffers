# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0008_auto_20151030_2309'),
    ]

    operations = [
        migrations.AddField(
            model_name='character',
            name='flaws',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
        migrations.AddField(
            model_name='character',
            name='specialties',
            field=models.ManyToManyField(to='resources.Specialty', blank=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='adventures',
            field=models.ManyToManyField(to='resources.Adventure', blank=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='campaign_settings',
            field=models.ManyToManyField(to='resources.CampaignSetting', blank=True),
        ),
        migrations.AlterField(
            model_name='character',
            name='locations',
            field=models.ManyToManyField(to='resources.Location', blank=True),
        ),
    ]
