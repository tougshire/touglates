from django.conf import settings


def touglates(request):
    touglates = settings.TOUGLATES[request.resolver_match.app_name]
    if "SITE_TITLE" in settings.TOUGLATES and not "SITE_TITLE" in touglates:
        touglates["SITE_TITLE"] = settings.TOUGLATES["SITE_TITLE"]
    return {"touglates": touglates}
