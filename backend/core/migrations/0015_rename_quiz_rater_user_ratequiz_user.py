# Generated by Django 5.1.2 on 2024-11-14 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_rename_takequiz_ratequiz_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ratequiz',
            old_name='quiz_rater_user',
            new_name='user',
        ),
    ]
