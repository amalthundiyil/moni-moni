# Generated by Django 4.1.2 on 2022-10-26 03:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "name",
                    models.CharField(
                        choices=[
                            ("help", "Help Needed"),
                            ("trending", "Trending"),
                            ("urgent", "Urgent"),
                        ],
                        default="others",
                        max_length=20,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("slug", models.SlugField(max_length=255, unique=True)),
            ],
            options={
                "verbose_name_plural": "categories",
            },
        ),
        migrations.CreateModel(
            name="Fundraiser",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True)),
                (
                    "image",
                    models.ImageField(default="default.png", upload_to="../../media/"),
                ),
                ("slug", models.SlugField(max_length=255, unique=True)),
                ("tags", models.CharField(default="newest", max_length=30)),
                (
                    "total_amount",
                    models.DecimalField(
                        decimal_places=2, default=20464297, max_digits=1000
                    ),
                ),
                (
                    "remaining_amount",
                    models.DecimalField(
                        decimal_places=2, default=7217, max_digits=1000
                    ),
                ),
                ("total_backers", models.IntegerField(default=0)),
                ("expiry", models.DateTimeField()),
                ("is_active", models.BooleanField(default=True)),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("updated", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name_plural": "fundraisers",
                "ordering": ("-created",),
            },
        ),
    ]
