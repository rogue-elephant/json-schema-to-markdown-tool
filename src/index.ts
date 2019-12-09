import simpleSchema from './_dummy-json/schema-example.schema.json';
import simpleSchema2 from './_dummy-json/schema-example2.schema.json';
import kubeSchema from './_dummy-json/kubernetes-example.scehma.json';
import { Generator } from './generator.js';

const json = [
  { schema: simpleSchema, title: 'Simple Schema' },
  { schema: simpleSchema2, title: 'Simple Schema 2' },
  { schema: kubeSchema, title: 'Kubernetes v1.9.9-standalone/nodelist.json' },
];
const outputs = new Generator().generateMarkdown(json);

const output = outputs.map(x => x.output).join('\r\n\r\n');
const foo = 'end';
