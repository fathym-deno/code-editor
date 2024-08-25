import { FunctionalComponent, Ref } from '../src.deps.ts';

import { CodeEditorHandle, CodeEditorProps } from './CodeEditor.tsx';
export { type CodeEditorHandle, type CodeEditorProps } from './CodeEditor.tsx';
export const CodeEditor = (await import('./CodeEditor.tsx'))
  .default as FunctionalComponent<
    React.PropsWithoutRef<CodeEditorProps> & {
      ref?: Ref<CodeEditorHandle> | undefined;
    }
  >;
