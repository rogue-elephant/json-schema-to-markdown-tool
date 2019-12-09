import simpleSchema from './_dummy-json/schema-example.schema.json';
import simpleSchema2 from './_dummy-json/schema-example2.schema.json';
import kubeSchema from './_dummy-json/kubernetes-example.scehma.json';
import { Generator } from './generator.js';

const json = [simpleSchema, simpleSchema2, kubeSchema];
const generator = new Generator(json);

const output = generator.schemas.map(x => x.output).join('\r\n\r\n');
const foo = 'end';
