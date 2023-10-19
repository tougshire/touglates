from django.conf import settings


def touglates(request):
    app_name = request.resolver_match.app_name
    touglates = {}
    if hasattr(settings, "TOUGLATES"):
        touglates = settings.TOUGLATES
    if app_name in settings.TOUGLATES:
        for key in settings.TOUGLATES[app_name]:
            touglates[key] = settings.TOUGLATES[app_name][key]

    return {"touglates": touglates}
