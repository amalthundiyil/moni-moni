# Generated by Django 4.1.2 on 2022-10-11 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("catalogue", "0005_alter_fundraiser_fund_remaining_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="fundraiser",
            name="fund_remaining",
            field=models.DecimalField(decimal_places=2, default=7641, max_digits=1000),
        ),
        migrations.AlterField(
            model_name="fundraiser",
            name="fund_total",
            field=models.DecimalField(
                decimal_places=2, default=30260865, max_digits=1000
            ),
        ),
    ]