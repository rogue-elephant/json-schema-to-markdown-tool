import simpleSchema from './_dummy-json/schema-example.schema.json';
import { Generator } from './generator.js';

const json = (simpleSchema as any);
const generator = new Generator(json);

const foo = 'end';
