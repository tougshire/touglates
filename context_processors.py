from django.conf import settings


def base_context_settings(request):
    app_name = request.resolver_match.app_name
    base_context_settings = {}
    if hasattr(settings, "BASE_CONTEXT_SETTINGS"):
        base_context_settings = settings.BASE_CONTEXT_SETTINGS
        if app_name in settings.BASE_CONTEXT_SETTINGS:
            base_context_settings.update(settings.BASE_CONTEXT_SETTINGS[app_name])

    return {"base_context_settings": base_context_settings}

def touglates(request):
    app_name = request.resolver_match.app_name
    touglates = {}
    if hasattr(settings, "TOUGLATES"):
        touglates = settings.TOUGLATES
        if app_name in settings.TOUGLATES:
            touglates.update(settings.TOUGLATES[app_name])

    return {"touglates": touglates}
