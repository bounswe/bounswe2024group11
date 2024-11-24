# Generated by Django 5.1.2 on 2024-11-21 21:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_takequiz_unique_together_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quizquestion',
            name='hint_text',
        ),
        migrations.RemoveField(
            model_name='quizquestion',
            name='hint_type',
        ),
        migrations.CreateModel(
            name='QuizQuestionHint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('text', models.CharField(max_length=1000)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hints', to='core.quizquestion')),
            ],
        ),
    ]