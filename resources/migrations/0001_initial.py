# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ability',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='AbilityModifier',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modifier', models.IntegerField()),
                ('ability', models.ForeignKey(to='resources.Ability')),
            ],
        ),
        migrations.CreateModel(
            name='Adventure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CampaignSetting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('adventures', models.ManyToManyField(to='resources.Adventure')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('internal_code', models.CharField(max_length=255)),
                ('parent_category', models.ForeignKey(blank=True, to='resources.Category', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('physical_score', models.PositiveIntegerField()),
                ('mental_score', models.PositiveIntegerField()),
                ('adventures', models.ManyToManyField(to='resources.Adventure')),
                ('campaign_settings', models.ManyToManyField(to='resources.CampaignSetting')),
            ],
        ),
        migrations.CreateModel(
            name='CoreAttribute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('internal_code', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Flaw',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('ability_modifiers', models.ManyToManyField(to='resources.AbilityModifier')),
            ],
        ),
        migrations.CreateModel(
            name='GlossaryTerm',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('term', models.CharField(max_length=255)),
                ('definition', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('adventures', models.ManyToManyField(to='resources.Adventure')),
                ('campaign_settings', models.ManyToManyField(to='resources.CampaignSetting')),
                ('characters', models.ManyToManyField(to='resources.Character')),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('parent_section', models.ForeignKey(to='resources.Section')),
            ],
        ),
        migrations.CreateModel(
            name='Specialty',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('ability_modifiers', models.ManyToManyField(to='resources.AbilityModifier')),
            ],
        ),
        migrations.AddField(
            model_name='character',
            name='locations',
            field=models.ManyToManyField(to='resources.Location'),
        ),
        migrations.AddField(
            model_name='campaignsetting',
            name='characters',
            field=models.ManyToManyField(to='resources.Character'),
        ),
        migrations.AddField(
            model_name='campaignsetting',
            name='locations',
            field=models.ManyToManyField(to='resources.Location'),
        ),
        migrations.AddField(
            model_name='adventure',
            name='campaign_settings',
            field=models.ManyToManyField(to='resources.CampaignSetting'),
        ),
        migrations.AddField(
            model_name='adventure',
            name='characters',
            field=models.ManyToManyField(to='resources.Character'),
        ),
        migrations.AddField(
            model_name='adventure',
            name='locations',
            field=models.ManyToManyField(to='resources.Location'),
        ),
        migrations.AddField(
            model_name='abilitymodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Flaw'),
        ),
        migrations.AddField(
            model_name='ability',
            name='categories',
            field=models.ManyToManyField(to='resources.Category'),
        ),
        migrations.AddField(
            model_name='ability',
            name='core_attributes',
            field=models.ManyToManyField(to='resources.CoreAttribute'),
        ),
        migrations.AddField(
            model_name='ability',
            name='parent_ability',
            field=models.ForeignKey(blank=True, to='resources.Ability', null=True),
        ),
    ]
