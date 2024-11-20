# Generated by Django 5.1.2 on 2024-11-17 20:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_rename_date_forumanswer_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forumdownvote',
            name='forum_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='downvotes', to='core.forumquestion'),
        ),
        migrations.AlterField(
            model_name='forumupvote',
            name='forum_question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='upvotes', to='core.forumquestion'),
        ),
        migrations.AlterField(
            model_name='takequiz',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='takes', to='core.quiz'),
        ),
    ]
