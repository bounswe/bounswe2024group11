# Generated by Django 5.1.2 on 2024-11-17 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_forumanswer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='forumanswer',
            old_name='date',
            new_name='created_at',
        ),
    ]