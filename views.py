from django.apps import apps
from django.http import HttpResponse
from django.shortcuts import render


def popup_closer(request, model_app, model_name, pk):
    object = apps.get_model(model_app, model_name).objects.get(pk=pk)
    label = str(object)

    response_text = f"""
    <script>
        window.opener.addOptionFromRelatedPopup("{pk}","{label}","{model_app}","{model_name}")
        window.close()
    </script>
    """

    return HttpResponse(response_text)
