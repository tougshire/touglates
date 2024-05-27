from django.apps import apps
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.html import escape


def popup_closer(request, app_name, model_name, pk):
    object = apps.get_model(app_name, model_name).objects.get(pk=pk)
    label = escape(str(object))

    response_text = f"""
    <script>
        window.opener.addOptionFromRelatedPopup("{pk}","{label}","{app_name}","{model_name}")
        window.close()
    </script>
    """

    return HttpResponse(response_text)
