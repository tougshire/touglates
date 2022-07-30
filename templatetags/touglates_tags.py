import markdown as md
from django import template
from django.conf import settings
from django.template.defaultfilters import stringfilter
from django.urls import reverse

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

@register.filter
def remove_linebreaks(value):
    return( str(value).replace("\n", " ").replace("\r", " "))


@register.filter()
@stringfilter
def markdown(value):
    return md.markdown(value, extensions=['markdown.extensions.fenced_code'])
