import { StyleType, markdownStyles } from './styles';
import { OutputGenerator, Converter } from 'json-conversion-tool';
import { isArray } from 'util';

export class Generator {
  private newline = '\r\n';
  constructor() {}

  public generateMarkdown(schemas: { schema: any; title: string }[]): { schema: any; output: string; title: string }[] {
    const schemaOutputs: { schema: any; output: string; title: string }[] = schemas.map(x => ({ ...x, output: '' }));
    schemaOutputs.forEach(schemaTuple => {
      const schema = schemaTuple.schema;
      const addLine = (prop: string, style: StyleType = 'none', extraSpacing = true) =>
        (schemaTuple.output += this.addLine(prop, style, extraSpacing));

      addLine(schemaTuple.title || 'Schema', 'h1');
      addLine(schema['title'], 'h2');
      addLine(schema['$id'], 'h2');
      addLine(schema['description'], 'bold');
      addLine(schema['$schema'], 'italic');

      const getFlattenedProps = (propName: string) => {
        addLine(propName, 'h2', false);
        if (!schema[propName]) {
          return;
        }
        Object.keys(schema[propName]).forEach(key => {
          schemaTuple.output += new OutputGenerator({
            ...new Converter().convertJson(schema[propName][key]),
            title: key,
          })
            .generateMarkdown()
            .replace('# ', '### ');
          schemaTuple.output += this.newline;
        });
      };
      getFlattenedProps('properties');
      getFlattenedProps('definitions');
    });
    return schemaOutputs;
  }

  private addLine = (text: string, style: StyleType = 'none', extraSpacing = true) => {
    if (!text) {
      return '';
    }
    const mdStyle = markdownStyles.filter(x => x.style === style)[0];
    return (
      mdStyle.markdown +
      text +
      (mdStyle.wraps ? mdStyle.markdown : '') +
      this.newline +
      (extraSpacing ? this.newline : '')
    );
  };
}
