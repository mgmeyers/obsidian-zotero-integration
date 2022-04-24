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
> {% endif %}
> {% if annotation.comment %}
> {{annotation.comment}}
{% endif %}
{% endfor %}
```

Please see the [Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html#variables) for more detail on templating.

## Where do I store my templates?

Templates can reside anywhere in your Obsidian vault. The path to the template is supplied in the import settings.

![](Screen%20Shot%202022-04-23%20at%2010.54.56%20AM.png)


## How do I format lists of data?

In the data explorer, you'll notice that annotations, tags, creators, and other values look something like:

![](Screen%20Shot%202022-04-09%20at%206.07.10%20PM.png)

The square brackets next to `annotations` here means that this is a list of annotations. To format a list you can use what's called a `for` loop ([see the docs on this here](https://mozilla.github.io/nunjucks/templating.html#for)). Which looks like:

```
{% for annotation in annotations %}
...do something...
{% endfor %}
```

Let's break this down a bit. Speaking this out loud, you might say, "for each annotation in the annotations list, '...do something...'". This will then loop through each item in the list.

`annotations` specifically refers the list provided by the Template Data, and `annotation` (singular) is what we're calling the current annotation, but we can call it whatever we want, for example:

```
{% for a in annotations %}
...do something...
{% endfor %}
```

But how do we access the fields of each annotation? This can be done using dot notation:

```
{% for a in annotations %}
{{a.annotatedText}}
{% endfor %}
```

Here, `a` is the current annotation and `annotatedText` is one field of this annotation. You can access all fields of the annotation this way:

```
{% for a in annotations %}
{{a.annotatedText}}
{{a.color}}
{{a.colorCategory}}
{{a.page}}
...ect...
{% endfor %}
```

Finally, there are special values that nunjucks provides. For example `loop.first` and `loop.last` will tell you if you are on the first item in a list or the last item. This can be useful if you're delimiting items in a list. Take tags, for example.

![](Screen%20Shot%202022-04-09%20at%206.22.35%20PM.png)

```
{% for t in tags %}{{t.tag}}{% if not loop.last %}, {% endif %}{% endfor %}
```

This will output each tag and place a comma after each except the last tag in the list, resulting in something like: `Fear conditioning, Learning and memory, Long-term memory`

## How do I prevent sections of my templates from being overwritten

Each time you import data from the same Zotero entry, it will overwrite the existing markdown file. You can prevent this using the `persist` template tag.

This can be used to create a section for notes:

```markdown
## {{title}}

### Notes
{% persist "notes" %}
{% endpersist %}
```

Which will create a markdown file that looks like:

```markdown
## The Boring Billion, a slingshot for Complex Life on Earth

### Notes
%% begin notes %%
%% end notes %%
```

Any content added between `%% begin notes %%` and `%% end notes %%` will not be overwritten.

You can also use this to import only the annotations that were added since the last import.

```markdown
{% persist "annotations" %}
{% set newAnnotations = annotations | filterby("date", "dateafter", lastImportDate) %}
{% if newAnnotations.length > 0 %}

### Imported: {{importDate | format("YYYY-MM-DD h:mm a")}}

{% for a in newAnnotations %}
> {{a.annotatedText}}
{% endfor %}

{% endif %}
{% endpersist %}
```

This would then allow you to add block IDs to annotations, edit annotations or annotation comments, and add additional notes to annotations.

## How do I include content from other markdown files

Templates can be split into multiple files if that makes organization easier for you. You can include those files in your main template using obsidian links:

```markdown
{% include "[[link to markdown file]]" %}
```

**Note:** if you want to include other markdown files in a `for` loop, you need to use `asyncEach` instead of `for`:

```
{% asyncEach a in annotations %}
{% include "[[annotation template]]" %}
{% endeach %}
```

## How do I migrate the old header, annotation, and footer templates to the new single template format?

Previously, this plugin used three different template files. For the sake of this example, let's call the content of each template `<header content>`, `<annotation content>`, and `<footer content>`. To migrate to the new single file template format all you need to do is create new markdown file that contains:

```
<header content>
{% persist "annotations" %}
<annotation content>
{% endpersist %}
<footer content>
```

## What custom nunjucks filters are available?

### `format("<Moment format>")`

All dates support formatting via Moment. See the [moment format reference](https://momentjs.com/docs/#/displaying/format/) for more details.

### `filterby("<property>", "<command>", "<parameter>")`

Allows filtering a list in several ways.

#### 'startswith'

Reduce a list down to only the items where a property starts with the specified parameter:

`{% set important = annotations | filterby("comment", "startswith", "important") %}`

#### 'endswith'

Reduce a list down to only the items where a property ends with the specified parameter:

`{% set important = annotations | filterby("comment", "endswith", "(important)") %}`

#### 'contains'

Reduce a list down to only the items where a property contains the specified parameter:

`{% set tagged = annotations | filterby("comment", "contains", "#my-tag") %}`

#### 'dateafter', 'dateonorafter'

Reduce a list down to only the items where a date property occurs after the specified date parameter:

`{% set annots = annotations | filterby("date", "dateafter", lastExportDate) %}`

#### 'datebefore', 'dateonorbefore'

Reduce a list down to only the items where a date property occurs before the specified date parameter:

`{% set previousAnnots = annotations | filterby("date", "datebefore", lastExportDate) %}`
