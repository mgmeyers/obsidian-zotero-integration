# FAQ - Frequently Asked Questions


## My import from Zotero fails, throws errors or behaves unexpectedly
There can be multiple reason for imports to fail.

- Please verify that your Bibliography Style is set and available in Zotero, too.
- Please check the [Obsidian Error Console](https://forum.obsidian.md/t/how-to-access-the-console/16703)
- Please double check your template to see if there is some typo.
- Use the plugins Data Explorer and check the raw data received from Zotero. This data is used then by the template to extract & format the information.
- Please also check also the FAQ entry "My import doesn't see any annotations"


## Does the Bibliography Style need to be set/activated on the Zotero side, too?

No. Only make sure that the Bibliography Style is available & installed in the Zotero. You can select a different one on the Zotero side.


## What are some example templates & steps on how to setup this plugin?
- Step by step guide: https://publish.obsidian.md/history-notes/01+Notetaking+for+Historians
- Some template examples: https://forum.obsidian.md/t/zotero-desktop-connector-import-templates/36310


## Do I need to extract annotations in Zotero into its own note?
Short answer is no.

In the past you had to extract annotations in Zotero into its own note. This is no longer required. When using templating, you can extract the annotation directly from Zotero. But this requires setting up a good template that works for you.

### But it might be easier to extract annotations first
The easiest way is to extract annotations in Zotero first and then use the "Insert notes into current document". Example import:

<img src="https://raw.githubusercontent.com/mgmeyers/obsidian-zotero-integration/main/screenshots/demo.gif" alt="A short gif demonstraiting importing notes form Zotero into the current file">

Importing via "Insert notes into your current document" will loose you the annotation color and any images/blocks you marked. This might not be desireable, but you no longer need to setup your own import template.


## My import doesn't see any annotations / doesn't import any images

There might be a bug in Bibtex or the Zotero Integration plugin. Zotero has the annotation but its not seen in Obsidian. Please reference https://github.com/mgmeyers/obsidian-zotero-integration/issues/107

You can export the PDF annotation in Zotero directly into a note. Downside is that you will loose images, links of the location and coloring of the note.


## Unanswered questions
- What is the difference of the various Bibtex configuration in the plugin configuration?
