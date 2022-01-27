from django.contrib import admin
from paytm.models import PaytmHistory


class PaytmHistoryAdmin(admin.ModelAdmin):
    list_display = ("user", "MID", "TXNAMOUNT", "STATUS")


admin.site.register(PaytmHistory, PaytmHistoryAdmin)
