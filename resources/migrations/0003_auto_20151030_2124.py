# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0002_auto_20151030_2034'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('base_value', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='AttributeModifier',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modifier', models.IntegerField()),
                ('attribute', models.ForeignKey(to='resources.Attribute')),
                ('specialties', models.ManyToManyField(to='resources.Flaw')),
            ],
        ),
        migrations.AlterField(
            model_name='specialty',
            name='ability_modifiers',
            field=models.ManyToManyField(to='resources.AbilityModifier', blank=True),
        ),
    ]
