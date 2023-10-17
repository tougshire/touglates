from django.forms.widgets import DateInput, DateTimeInput


class TouglateDateInput(DateInput):
    media = {"js": "touglates/static/touglates.js"}
    template_name = "touglates/date_field.html"


class TouglateDateTimeInput(DateTimeInput):
    media = {"js": "touglates/static/touglates.js"}
    template_name = "touglates/datetime_field.html"
