import { template } from '../template.helpers';

const creatorTemplate = `
{%- for creator in creators -%}
	{%- if creator.name -%}
		{{creator.name}}
	{%- else -%}
		{{creator.firstName}} {{creator.lastName}}
	{%- endif -%}
	{% if not loop.last %}, {% endif %}
{%- endfor -%}
`;

const pdfLinkTemplate = `
{%- set file = attachments | filterby("path", "endswith", ".pdf") | first -%}
{%- if file and file.path and file.path.endsWith(".pdf") -%}
	[{{file.title}}](file://{{file.path | replace(" ", "%20")}})
{%- endif -%}
`;

const pdfZoteroLinkTemplate = `
{%- set file = attachments | filterby("path", "endswith", ".pdf") | first -%}
{%- if file and file.path and file.path.endsWith(".pdf") -%}
	[{{file.title}}]({{file.desktopURI}})
{%- endif -%}
`;

const annotationsTemplate = `
{%- set annots = annotations | filterby("date", "dateafter", lastExportDate) -%}
{%- if annots.length > 0 %}
**Exported: {{exportDate | format("YYYY-MM-DD")}}**

{% for annotation in annots -%}
	{%- if annotation.annotatedText -%}
    > “{{annotation.annotatedText}}”{% if annotation.color %} <mark style="background:{{annotation.color}}dd">{{annotation.type | capitalize}}</mark> {% else %} ({{annotation.type | capitalize}}) {% endif %}[Page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}})
    {%- endif %}
	{%- if annotation.imageRelativePath -%}
	> ![[{{annotation.imageRelativePath}}]]
    {%- endif %}
{% if annotation.comment %}
{{annotation.comment}}
{% endif %}
{% endfor -%}
{%- endif -%}
`

export function applyBasicTemplates(itemData: Record<any, any>) {
  if (!itemData) return itemData;

  const creatorsByType = (itemData.creators || []).reduce(
    (byType: any, current: any) => {
      if (!byType[current.creatorType]) byType[current.creatorType] = [];
      byType[current.creatorType].push(current);
      return byType;
    },
    {}
  );

  Object.keys(creatorsByType).forEach((type) => {
    itemData[`${type}s`] = template.renderString(creatorTemplate, {
      creators: creatorsByType[type],
    }).trim();
  });

  const pdfLink = template.renderString(pdfLinkTemplate, itemData).trim();
  if (pdfLink) itemData.pdfLink = pdfLink;

  const pdfZoteroLink = template.renderString(pdfZoteroLinkTemplate, itemData).trim();
  if (pdfZoteroLink) itemData.pdfZoteroLink = pdfZoteroLink;

  if (itemData.notes?.length) {
    const notes = itemData.notes.reduce((combined: string, current: any) => {
      if (current.note) {
        return `${combined}\n\n${current.note.trim()}`;
      }

      return combined;
    }, '').trim();

    if (notes) {
      itemData.markdownNotes = notes;
    }
  }

  if (itemData.tags?.length) {
    itemData.allTags = itemData.tags.map((t: any) => t.tag).join(', ');
  }

  if (itemData.annotations?.length) {
      itemData.formattedAnnotations = template.renderString(annotationsTemplate, itemData).trim()
  }

  return itemData;
}
