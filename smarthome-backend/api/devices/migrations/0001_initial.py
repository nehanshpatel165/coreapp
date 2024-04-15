# Generated by Django 5.0.2 on 2024-04-15 05:32

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('location', '0002_sensorlocation_category'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Devices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_name', models.TextField(max_length=100)),
                ('type_of_device', models.TextField(choices=[('Fan', 'fan'), ('Light', 'light'), ('AC', 'AC'), ('Heater', 'heater'), ('Solar Panel', 'solar_panel'), ('Air Purifier', 'air_purifier'), ('Others', 'Others')], default='Others', max_length=100)),
                ('model', models.TextField(blank=True, max_length=100, null=True)),
                ('installation_date', models.DateField(blank=True, null=True)),
                ('filter_type', models.TextField(blank=True, max_length=100, null=True)),
                ('filter_change_interval', models.IntegerField(blank=True, null=True)),
                ('last_filter_change_date', models.DateField(blank=True, null=True)),
                ('data_source_id', models.TextField(blank=True, max_length=100, null=True)),
                ('desc', models.TextField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='location.sensorlocation')),
            ],
        ),
    ]
