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
export const markdownStyles: IMarkdownOutput[] = [
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

export interface IMarkdownOutput {
  style: StyleType;
  wraps: boolean;
  markdown: string;
}
