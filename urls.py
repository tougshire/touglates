from django.urls import path
from django.views.i18n import JavaScriptCatalog
from .views import popup_closer

app_name = "touglates"

urlpatterns = [
    path(
        "popup_closer/<int:pk>/<str:model_name>/<str:app_name>/",
        popup_closer,
        name="popup_closer",
    ),
    # to use the following path, there must be values for all three of to_field_value, attrs, and callback
    # to_field_value: The ID field.  If "-" then pk will be used
    # attrs: Extra attrs to be included in the new select option
    # callback: A javascript function to be called after the new select option is added
    # For dummy values, you can use dashes ex:
    #           return reverse("touglates:popup_closer",
    #                 kwargs={
    #                     "pk": self.object.pk,
    #                     "model_name": self.model.__name__,
    #                     "app_name": self.model._meta.app_label,
    #                     "to_field_value":"-",
    #                     "attrs":"category=" + self.object.category,
    #                     "callback": "setStyleByCategory"
    #                 },
    #             )
    path(
        "popup_closer/<int:pk>/<str:model_name>/<str:app_name>/<str:to_field_value>/<str:attrs>/<str:callback>/",
        popup_closer,
        name="popup_closer",
    ),

    path("jsi18n", JavaScriptCatalog.as_view(), name="js-catlog"),
]
