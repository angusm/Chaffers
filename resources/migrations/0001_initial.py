# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import resources.libraries.dictable.dictable


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AbilityModifier',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modifier', models.IntegerField()),
                ('display_name', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
                'ordering': ['display_name'],
            },
            bases=(models.Model, resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='AttributeModifier',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modifier', models.IntegerField()),
                ('display_name', models.CharField(max_length=255, null=True, blank=True)),
            ],
            bases=(models.Model, resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='TextBlock',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('raw_description', models.TextField()),
            ],
            bases=(models.Model, resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='TextSubstitution',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text_substitution_label', models.CharField(unique=True, max_length=255)),
                ('display_name', models.CharField(max_length=255, null=True, blank=True)),
            ],
            bases=(models.Model, resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Ability',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['display_name'],
            },
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Adventure',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('base_value', models.IntegerField()),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='CampaignSetting',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('adventures', models.ManyToManyField(to='resources.Adventure', blank=True)),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('parent_category', models.ForeignKey(blank=True, to='resources.Category', null=True)),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('adventures', models.ManyToManyField(to='resources.Adventure', blank=True)),
                ('campaign_settings', models.ManyToManyField(to='resources.CampaignSetting', blank=True)),
                ('description', models.ForeignKey(to='resources.TextBlock')),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='CharacterTrait',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
            ],
            options={
                'ordering': ['display_name'],
            },
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='GlossaryTerm',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('definition', models.ForeignKey(to='resources.TextBlock')),
            ],
            bases=('resources.textsubstitution',),
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('adventures', models.ManyToManyField(to='resources.Adventure')),
                ('campaign_settings', models.ManyToManyField(to='resources.CampaignSetting')),
                ('characters', models.ManyToManyField(to='resources.Character')),
                ('description', models.ForeignKey(to='resources.TextBlock')),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('description', models.ForeignKey(to='resources.TextBlock')),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('textsubstitution_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.TextSubstitution')),
                ('parent_section', models.ForeignKey(to='resources.Section')),
                ('text', models.ForeignKey(to='resources.TextBlock')),
            ],
            bases=('resources.textsubstitution', resources.libraries.dictable.dictable.Dictable),
        ),
        migrations.CreateModel(
            name='Flaw',
            fields=[
                ('charactertrait_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.CharacterTrait')),
            ],
            bases=('resources.charactertrait',),
        ),
        migrations.CreateModel(
            name='Specialty',
            fields=[
                ('charactertrait_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='resources.CharacterTrait')),
            ],
            bases=('resources.charactertrait',),
        ),
        migrations.AddField(
            model_name='charactertrait',
            name='ability_modifiers',
            field=models.ManyToManyField(to='resources.AbilityModifier', blank=True),
        ),
        migrations.AddField(
            model_name='charactertrait',
            name='attribute_modifiers',
            field=models.ManyToManyField(to='resources.AttributeModifier', blank=True),
        ),
        migrations.AddField(
            model_name='charactertrait',
            name='description',
            field=models.ForeignKey(to='resources.TextBlock'),
        ),
        migrations.AddField(
            model_name='character',
            name='locations',
            field=models.ManyToManyField(to='resources.Location', blank=True),
        ),
        migrations.AddField(
            model_name='campaignsetting',
            name='characters',
            field=models.ManyToManyField(to='resources.Character', blank=True),
        ),
        migrations.AddField(
            model_name='campaignsetting',
            name='description',
            field=models.ForeignKey(to='resources.TextBlock'),
        ),
        migrations.AddField(
            model_name='campaignsetting',
            name='locations',
            field=models.ManyToManyField(to='resources.Location', blank=True),
        ),
        migrations.AddField(
            model_name='attributemodifier',
            name='attribute',
            field=models.ForeignKey(to='resources.Attribute'),
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
            name='description',
            field=models.ForeignKey(to='resources.TextBlock'),
        ),
        migrations.AddField(
            model_name='adventure',
            name='locations',
            field=models.ManyToManyField(to='resources.Location'),
        ),
        migrations.AddField(
            model_name='abilitymodifier',
            name='ability',
            field=models.ForeignKey(to='resources.Ability'),
        ),
        migrations.AddField(
            model_name='ability',
            name='categories',
            field=models.ManyToManyField(to='resources.Category'),
        ),
        migrations.AddField(
            model_name='ability',
            name='description',
            field=models.ForeignKey(to='resources.TextBlock'),
        ),
        migrations.AddField(
            model_name='ability',
            name='parent_ability',
            field=models.ForeignKey(blank=True, to='resources.Ability', null=True),
        ),
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
        migrations.AddField(
            model_name='attributemodifier',
            name='flaws',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
        migrations.AddField(
            model_name='attributemodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Specialty', blank=True),
        ),
        migrations.AddField(
            model_name='abilitymodifier',
            name='flaws',
            field=models.ManyToManyField(to='resources.Flaw', blank=True),
        ),
        migrations.AddField(
            model_name='abilitymodifier',
            name='specialties',
            field=models.ManyToManyField(to='resources.Specialty', blank=True),
        ),
    ]
