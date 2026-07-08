from django.urls import path

from . import views

urlpatterns = [
    path("schemes/", views.get_schemes, name="get_schemes"),
    path("schemes/<str:scheme_id>/", views.get_scheme_detail, name="get_scheme_detail"),
]
