# Generated by Django 5.1.2 on 2024-11-12 11:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_takequiz'),
    ]

    operations = [
        migrations.RenameField(
            model_name='takequiz',
            old_name='author',
            new_name='quiz_taker',
        ),
    ]
