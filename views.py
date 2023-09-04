from django.apps import apps
from django.http import HttpResponse
from django.shortcuts import render

def window_closer( request, app_name, model_name, pk ):

    object = apps.get_model(app_name, model_name).objects.get(pk=pk)
    label = str(object)

    response_text = """
    <script>
        window.opener.addOptionFromPopup("{}","{}","{}")
        window.close()
    </script>
    """.format(pk, label, model_name)

    return HttpResponse(response_text)

