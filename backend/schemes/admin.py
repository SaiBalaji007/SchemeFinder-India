from django.contrib import admin

from .models import Scheme


@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ("scheme_id", "scheme_name", "category", "state", "government_level", "status")
    list_filter = ("category", "state", "government_level", "status")
    search_fields = ("scheme_id", "scheme_name", "description")
