import { Converter, OutputGenerator } from 'json-conversion-tool';

const json = `{
    "$id": "https://example.com/arrays.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "A representation of a person, company, organization, or place",
    "type": "object",
    "properties": {
      "fruits": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "vegetables": {
        "type": "array",
        "items": { "$ref": "#/definitions/veggie" }
      }
    },
    "definitions": {
      "veggie": {
        "type": "object",
        "required": [ "veggieName", "veggieLike" ],
        "properties": {
          "veggieName": {
            "type": "string",
            "description": "The name of the vegetable."
          },
          "veggieLike": {
            "type": "boolean",
            "description": "Do I like this vegetable?"
          }
        }
      }
    }
  }`;
const obj = JSON.parse(json);
const flatJson = new Converter().convertJson(obj);
const newline = '\r\n';
let output = '';
export type StyleType =
  | 'none'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'italic'
  | 'bold'
  | 'codeline'
  | 'codeblock'
  | 'quote'
  | 'list';
const markdownStyles: { style: StyleType; wraps: boolean; markdown: string }[] = [
  { style: 'none', wraps: false, markdown: '' },
  { style: 'h1', wraps: false, markdown: '# ' },
  { style: 'h2', wraps: false, markdown: '## ' },
  { style: 'h3', wraps: false, markdown: '### ' },
  { style: 'h4', wraps: false, markdown: '#### ' },
  { style: 'italic', wraps: true, markdown: '_' },
  { style: 'bold', wraps: true, markdown: '*' },
  { style: 'codeline', wraps: true, markdown: '`' },
  { style: 'list', wraps: false, markdown: '- ' },
];
const addLine = (prop: string, style: StyleType = 'none', extraSpacing = true) => {
  const mdStyle = markdownStyles.filter(x => x.style === style)[0];
  output += mdStyle.markdown + prop + (mdStyle.wraps ? mdStyle.markdown : '') + newline + (extraSpacing ? newline : '');
};
addLine(obj['$id'], 'h1');
addLine(obj['description'], 'bold');
addLine(obj['$schema'], 'codeline');

const getFlattenedProps = (propName: string) => {
    addLine(propName, 'h2', false);
    Object.keys(obj[propName]).forEach(key => {
        output += new OutputGenerator({ ...new Converter().convertJson(obj[propName][key]), title: key })
        .generateMarkdown()
        .replace('# ', '### ');
      output += newline;
    })
};

getFlattenedProps('properties');
getFlattenedProps('definitions');

const foo = 'end';
