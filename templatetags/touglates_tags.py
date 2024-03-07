import markdown as md
from django import template
from django.conf import settings
from django.template.defaultfilters import stringfilter
from django.urls import reverse
from html_sanitizer.django import get_sanitizer
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def project_include_file(name=""):
    if name == "":
        try:
            return settings.PROJECT_INCLUDE_FILE
        except AttributeError:
            return None
    else:
        try:
            return settings.PROJECT_INCLUDE_FILES[name]
        except AttributeError:
            return None


@register.filter
def remove_linebreaks(value):
    return str(value).replace("\n", " ").replace("\r", " ")


@register.filter()
@stringfilter
def markdown(value):
    return markdown.markdown(value, extensions=["markdown.extensions.fenced_code"])


@register.filter
@stringfilter
def render_with_format(value, format="markdown"):
    sanitizer = get_sanitizer(name="sdc_site")
    if format == "markdown":
        return sanitizer.sanitize(
            md.markdown(value, extensions=["markdown.extensions.fenced_code"])
        )
    elif format == "html":
        return sanitizer.sanitize(value)
    elif format == "plaintext":
        return sanitizer.sanitize(value.replace("\n", "<br/>"))
