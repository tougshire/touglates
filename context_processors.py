from django.conf import settings


def touglates(request):
    app_name = request.resolver_match.app_name
    touglates = {}
    if app_name in settings.TOUGLATES:
        touglates = settings.TOUGLATES[app_name]

    if "SITE_TITLE" in settings.TOUGLATES and not "SITE_TITLE" in touglates:
        touglates["SITE_TITLE"] = settings.TOUGLATES["SITE_TITLE"]

    return {"touglates": touglates}
