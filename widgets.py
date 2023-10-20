from django.forms.widgets import DateInput, DateTimeInput


class TouglateDateInput(DateInput):
    def __init__(self, attrs={"type": "date"}, format=None, buttons={"all": "on"}):
        super().__init__(attrs, format)

        if not type(buttons) == dict:
            buttonlist = (
                [buttons]
                if type(buttons) == str
                else buttons
                if type(buttons) == list or type(buttons) == tuple
                else ()
            )
            buttons = {}
            for buttonkey in buttonlist:
                buttons[buttonkey] = "on"

        for key in buttons:
            if not buttons[key].lower() == "on":
                buttons.pop(key)

        self.buttons = buttons

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["buttons"] = self.buttons
        return context

    media = {"js": "touglates/static/touglates.js"}
    template_name = "touglates/date_field.html"


class TouglateDateTimeInput(DateTimeInput):
    media = {"js": "touglates/static/touglates.js"}
    template_name = "touglates/datetime_field.html"
