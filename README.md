# touglates

A collection of templates and scripts to perform various functions in Django

Until further notice this project is in initial development and updates might break older versions


## Installation

Download or clone touglates as an app folder in your Django project and include `touglates.apps.TouglatesConfig` in your INSTALLED_APPS

## Features

Touglates currently provides a few features.  Currently, I'm only describing tougshire_tags because it's the closest to being ready

### tougshire_tags

tougshire_tags.py is a template tags file.  To use tougshire tags place {% load touglates_tags %} in your template

#### project_include_file

project_include_file is a simple tag in tougshire_tags.py that allows you to name one or more include files in your settings and refer to it or them in your templates.  The advantage of this is it makes your apps more portable.  For example, if you have multiple projects, each with a main menu file, and at least one shared app, that app can call {% project_include_file 'main menu' %} in each project.

You do this by adding the name of the file as `PROJECT_INCLUDE_FILE` to settings, or as a dictionary value in `PROJECT_INCLUDE_FILES`.  In a template which loads tougshire_tags, use the tag `{% project_include_file %}` or `{% project_include_file 'dictionary_key' %}`

If there is no PROJECT_INCLUDE_FILE or matching PROJECT_INCLUDE_FILES entry, the tag will fail silently and no file will be included.

However, if there is a PROJECT_INCLUDE_FILE or matching PROJECT_INCLUDE_FILES entry but the template is not found, Django will throw a TemplateDoesNotExist exception

Example: PROJECT_INCLUDE_FILE

In settings:

`PROJECT_INCLUDE_FILE = 'myproject/main_menu.html'`

in your template:

```
{% load touglates_tags %}
...
<div id="mainmenu">
{% project_include_file %}
</div>
...
```

Example: PROJECT_INCLUDE_FILES

In settings:

```
PROJECT_INCLUDE_FILES = {
    'main_menu':'myproject/main_menu.html',
    'alt_menu':'myproject/alt_menu.html',
}
```

in your template:

```
{% load touglates_tags %}
...
<div id="mainmenu">
{% project_include_file 'main_menu %}
</div>
...
```


