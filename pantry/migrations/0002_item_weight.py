# Generated by Django 3.0.1 on 2020-08-26 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pantry', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='weight',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
