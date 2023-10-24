from django.urls import path
from .views import popup_closer

app_name = "touglates"

urlpatterns = [
    path(
        "popup_closer/<str:app_name>/<str:model_name>/<int:pk>/",
        popup_closer,
        name="popup_closer",
    ),
]
