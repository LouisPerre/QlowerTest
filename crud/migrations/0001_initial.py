# Generated by Django 4.2.10 on 2024-02-27 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(blank=True, max_length=200, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('author', models.TextField(blank=True, default='John Doe', null=True)),
                ('datetime_posted', models.DateField(auto_now_add=True)),
                ('datetime_updated', models.DateField(blank=True, null=True)),
            ],
        ),
    ]
