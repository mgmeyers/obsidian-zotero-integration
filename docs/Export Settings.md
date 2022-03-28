## What is an export format?

Export formats define how data from Zotero should be exported and converted to markdown in your Obsidian vault.

### Output path

The output path is where the exported markdown should be saved within your vault. Output paths support templating. You can view the data available to templates using the `Data Explorer` command in Obsidian's command pallette.

### Image output path

The image output path is where any extracted images should be saved within your vault.

### Image base name

The base file name of exported images. Eg. `image` will result in `image-1-x123-y456.jpg` where `1` is the page number and `x123` and `y456` are the x and y coordinates of rectangle annotation on the page. Supports templating. Templates have access to data from the Zotero item and the current attachment.

### Header, annotation, and footer templates

See [Templating](Templating.md).

### Bibliography style

The data exported from Zotero includes a formatted bibliography for the selected items. This setting determines how the bibliography is formatted.
