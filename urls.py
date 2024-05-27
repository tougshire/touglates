from django.urls import path
from django.views.i18n import JavaScriptCatalog
from .views import popup_closer

app_name = "touglates"

urlpatterns = [
    path(
        "popup_closer/<str:app_name>/<str:model_name>/<int:pk>/",
        popup_closer,
        name="popup_closer",
    ),
    path("jsi18n", JavaScriptCatalog.as_view(), name="js-catlog"),
]
