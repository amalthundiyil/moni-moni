from django.db import models


class FundraiserManager(models.Manager):
    def get_queryset(self):
        return super(FundraiserManager, self).get_queryset().filter(is_active=True)
