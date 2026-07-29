import ast
from urllib.parse import parse_qsl

from django import template
from django.conf import settings
from django.template.defaultfilters import stringfilter
from touglates.forms import BoundFieldWithAttrs

import logging

logger = logging.getLogger(__name__)

register = template.Library()


# Depreciated and will be removed in favor of context processor resplacement
@register.simple_tag
def project_include_file(name=""):
    if name == "":
        try:
            return settings.PROJECT_INCLUDE_FILE
        except AttributeError:
            logger.error("Attribute Error in Touglates project_include_file.  Check if PROJECT_INCLUDE_FILE is in settings.")
            return None
    else:
        try:
            return settings.PROJECT_INCLUDE_FILES[name]
        except AttributeError:
            logger.error("Attribute Error in Touglates project_include_file.  Check if PROJECT_INCLUDE_FILE is in settings.")
            return None
        except KeyError:
            logger.error("Key Error in Touglates project_include_file.  Check if PROJECT_INCLUDE_FILE is in settings with key \"" + name + "\".")
            return None


@register.filter
def remove_linebreaks(value):
    return str(value).replace("\n", " ").replace("\r", " ")


@register.filter()
@stringfilter
def markdown(value):
    return markdown.markdown(value, extensions=["markdown.extensions.fenced_code"])


@register.filter()
def attrs(field, attrstring):
    try:
        attrs = ast.literal_eval(attrstring)
    except SyntaxError:
        attrs = dict(parse_qsl(attrstring))

    return BoundFieldWithAttrs(field.form, field.field, field.name, attrs)

#h/t https://www.geeksforgeeks.org/python/concatenate-strings-in-django-templates/ 
@register.filter()
def concate(first, second):
    return str(first) + str(second)
