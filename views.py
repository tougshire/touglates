from django.apps import apps
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.html import escape
import urllib

def popup_closer(request, app_name, model_name, pk, to_field_value="-", attrs="-", callback="-"):
    object = apps.get_model(app_name, model_name).objects.get(pk=pk)
    label = escape(str(object))

    value = pk if not to_field_value > "" else urllib.parse.unquote_plus(to_field_value)

    nothings=["-","_"]
    if to_field_value in nothings:
        to_field_value = ""
    if attrs in nothings:
        attrs = ""
    if callback in nothings:
        callback = ""

    callbackcall=""
    if callback > "":
        callbackcall = f"""window.opener.{ callback }()"""

    response_text = f"""
    <script>
        window.opener.addOptionFromRelatedPopup("{value}","{label}","{model_name}","{app_name}", "{ attrs }")
        { callbackcall }
        window.close()
    </script>
    """

    return HttpResponse(response_text)
