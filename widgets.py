from django.conf import settings
from django.forms import Select, ValidationError, CharField
from django.forms.widgets import (
    DateInput,
    DateTimeInput,
    ChoiceWidget,
    SelectMultiple,
    TextInput,
)


class TouglateDateInput(DateInput):
    template_name = "touglates/date_field.html"

    class Media:
        js = ("touglates/touglates.js",)

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


class TouglatesRelatedSelect(Select):
    template_name = "touglates/relatedselect_field.html"

    class Media:
        js = ("touglates/touglates.js",)

    def __init__(self, attrs=None, choices=(), related_data={}, add_filter_input=""):
        super().__init__(attrs, choices)
        self.related_data = related_data
        self.add_filter_input = add_filter_input

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["related_data"] = self.related_data
        context["widget"]["add_filter_input"] = self.add_filter_input
        return context


class DropdownSelectMultiple(SelectMultiple):
    template_name = "touglates/dropdown_select.html"


class SlugInput(TextInput):
    template_name = "touglates/slug_field.html"

    class Media:
        js = ("touglates/touglates.js",)

    def __init__(self, attrs=None, slug_name="", input_name=""):
        super().__init__(
            attrs,
        )
        self.input_name = input_name
        self.slug_name = slug_name

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["input_name"] = self.input_name
        context["widget"]["slug_name"] = self.slug_name

        return context


class HoneypotField(CharField):

    template_name = "touglates/honypot_field.html"

    def clean(self, value):
        if cleaned_value := super().clean(value):
            raise ValidationError("")
        else:
            return cleaned_value
