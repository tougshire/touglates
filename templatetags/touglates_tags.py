from django import template
from django.urls import reverse
from django.conf import settings

register = template.Library()

@register.simple_tag
def project_include_file( name='' ):
    if name=='':
        try:
            return settings.PROJECT_INCLUDE_FILE
        except AttributeError:
            return None
    else:
        try:
            return settings.PROJECT_INCLUDE_FILES[ name ]
        except AttributeError:
            return None

@register.simple_tag
def project_css_file():
    try:
        return settings.PROJECT_CSS_FILE
    except AttributeError:
        return None

@register.simple_tag
def test():
    return 'tp m2kd22'

