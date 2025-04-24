from django.forms import BoundField


class BoundFieldWithAttrs(BoundField):
    def __init__(self, form, field, name, attrs):
        super().__init__(form, field, name)
        self.attrs = attrs

    def build_widget_attrs(self, attrs, widget=None):
        built_attrs = super().build_widget_attrs(attrs, widget)
        built_attrs.update(self.attrs)
        return built_attrs
