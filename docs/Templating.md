## Why are there three template options?

Currently, you are able to define `Header`, `Annotation`, and `Footer` templates. Annotation templates are unique in that any existing exported annotations will not be overwritten. This allows you to edit the annotation markdown and have your changes persist when exporting multiple times. If you don't care about this, you can use just the header template. The same data is available to all templates.

## What data is available to templates?

You can view the data available to templates using the `Data Explorer` command in Obsidian's command pallette.

![](Screen%20Shot%202022-03-28%20at%2011.11.24%20AM.png)

## What templating language do I use?

Zotero Desktop Connector uses the [Nunjucks templating language](https://mozilla.github.io/nunjucks/templating.html#variables). Nunjucks is a robust templating language, but also has a learning curve.

A basic template might looks something like:

```markdown
## {{title}}
### Formatted Bibliography
{{bibliography}}
{% if abstractNote %}
### Abstract
{{abstractNote}}
{% endif %}
```

And a basic annotation template:

```markdown
{% for annotation in annotations %}
{% if annotation.annotatedText %}
> {{annotation.annotatedText}}
{% endif %}
{% if annotation.comment %}
{{annotation.comment}}
{% endif %}
{% endfor %}
```

Please see the [Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html#variables) for more detail on templating.

## Where do I store my templates?

Templates can reside anywhere in your Obsidian vault. The path to the template is supplied in the export settings.

![](Screen%20Shot%202022-03-28%20at%2011.21.07%20AM.png)