from django.forms.widgets import DateInput

class TouglateDateInput(DateInput):
    media={'js':'touglates/static/touglates.js'}
    template_name = "touglates/date_field.html"
