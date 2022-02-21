# touglates

A collection of templates and scripts to perform various functions in Django

Until further notice this project is in initial development and updates might break older versions


## Installation

Download or clone touglates as an app folder in your Django project and include 'touglates.apps.TouglatesConfig' in your INSTALLED_APPS attribute in settings

Touglates currently provides a few features.

## tougshire_tags

Touglates tags is a template tags file.  To use tougshire tags place {% load touglates_tags %} in your template

### project_include_file

project_include_file is a simple tag in tougshire_tags.py that allows you to name one or more include files in your settings and refer to it or them in your templates.

You do this by adding PROJECT_INCLUDE_FILE to settings as a string, then, in a template which loads tougshire_tags, using the tag {% project_include_file %}  to include the file.

You can designate more than one file, by adding PROJECT_INCLUDE_FILES as a dictionary in your settings, then using {% project_include_file 'filename_key' %}

The advantage of this is it makes your apps more portable.  For example, if you have multiple projects, each with a main menu file, and at least one shared app, that app can call {% project_include_file 'main menu' %} in each project.

If there is no PROJECT_INCLUDE_FILE setting, or no PROJECT_INCLUDE_FILES with a 'main menu' key, the tag will fail silently and no file will be included.  This way, your app can be included in projects that don't have the setting

However, if there is an appropriate setting but the template is not found, Django will throw a TemplateDoesNotExist exception

Example: PROJECT_INCLUDE_FILE

In settings:

PROJECT_INCLUDE_FILE = 'myproject/main_menu.html'

in your template:

{% load touglates_tags %}
...
{% project_include_file %}
...

Example: PROJECT_INCLUDE_FILES

In settings:

PROJECT_INCLUDE_FILES = {
    'main_menu':'myproject/main_menu.html',
    'alt_menu':'myproject/alt_menu.html',
}

in your template:

{% load touglates_tags %}
...
{% project_include_file 'main_menu %}
...


PROJECT_INCLUDE_FILES = {
    'main menu':'myproject/main_menu.html',
    'alt menu':'myproject/alt_menu.html',
}

