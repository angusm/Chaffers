# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0003_auto_20151030_2124'),
    ]

    operations = [
        migrations.CreateModel(
            name='CharacterTrait',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('ability_modifiers', models.ManyToManyField(to='resources.AbilityModifier', blank=True)),
                ('attribute_modifiers', models.ManyToManyField(to='resources.AttributeModifier', blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='flaw',
            name='ability_modifiers',
        ),
        migrations.RemoveField(
            model_name='flaw',
            name='description',
        ),
        migrations.RemoveField(
            model_name='flaw',
            name='id',
        ),
        migrations.RemoveField(
            model_name='flaw',
            name='name',
        ),
        migrations.RemoveField(
            model_name='specialty',
            name='ability_modifiers',
        ),
        migrations.RemoveField(
            model_name='specialty',
            name='description',
        ),
        migrations.RemoveField(
            model_name='specialty',
            name='id',
        ),
        migrations.RemoveField(
            model_name='specialty',
            name='name',
        ),
        migrations.AddField(
            model_name='flaw',
            name='charactertrait_ptr',
            field=models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, default=1, serialize=False, to='resources.CharacterTrait'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='specialty',
            name='charactertrait_ptr',
            field=models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, default=1, serialize=False, to='resources.CharacterTrait'),
            preserve_default=False,
        ),
    ]
