import { JSX } from '../src.deps.ts';

import { CodeEditorProps } from './CodeEditor.tsx';
export { type CodeEditorProps } from './CodeEditor.tsx';
export const CodeEditor: (props: CodeEditorProps) => JSX.Element = (
  await import('./CodeEditor.tsx')
).default;

