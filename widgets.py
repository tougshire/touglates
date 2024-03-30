from django.forms import Select
from django.forms.widgets import DateInput, DateTimeInput, ChoiceWidget, SelectMultiple


class TouglateDateInput(DateInput):
    template_name = "touglates/date_field.html"
    media = {"js": "touglates/static/touglates.js"}

    def __init__(self, attrs={"type": "date"}, format=None, buttons={"all": "on"}):
        super().__init__(attrs, format)

        if not type(buttons) == dict:
            buttonlist = (
                [buttons]
                if type(buttons) == str
                else buttons if type(buttons) == list or type(buttons) == tuple else ()
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


class TouglateRelatedSelect(Select):
    template_name = "touglates/relatedselect_field.html"
    media = {"js": "touglates/static/touglates.js"}

    def __init__(self, attrs=None, choices=(), related_data={}):
        super().__init__(attrs, choices)
        self.related_data = related_data

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["related_data"] = self.related_data
        return context


class DropdownSelectMultiple(SelectMultiple):
    template_name = "touglates/dropdown_select.html"
