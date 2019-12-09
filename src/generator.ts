import { StyleType, markdownStyles } from './styles';
import { OutputGenerator, Converter } from 'json-conversion-tool';
import { isArray } from 'util';

export class Generator {
  public schemas: { schema: any; output: string }[] = [];
  private newline = '\r\n';
  constructor(jsonSchema: any) {
    if (isArray(jsonSchema)) {
      this.schemas = jsonSchema.map(x => {
        return { schema: x, output: '' };
      });
    } else {
      this.schemas.push({ schema: jsonSchema, output: '' });
    }

    this.generateMarkdown();
  }

  private generateMarkdown() {
    this.schemas.forEach(schemaTuple => {
      const schema = schemaTuple.schema;
      const addLine = (prop: string, style: StyleType = 'none', extraSpacing = true) =>
        this.addLine(schemaTuple.output, prop, style, extraSpacing);

      this.addLine(schema['$id'], 'h1');
      this.addLine(schema['description'], 'bold');
      this.addLine(schema['$schema'], 'codeline');

      const getFlattenedProps = (propName: string) => {
        addLine(propName, 'h2', false);
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
  }

  private addLine = (output: string, prop: string, style: StyleType = 'none', extraSpacing = true) => {
    const mdStyle = markdownStyles.filter(x => x.style === style)[0];
    output +=
      mdStyle.markdown +
      prop +
      (mdStyle.wraps ? mdStyle.markdown : '') +
      this.newline +
      (extraSpacing ? this.newline : '');
  };
}
