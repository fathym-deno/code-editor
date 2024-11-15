import { Extension, javascript } from '../codemirror.deps.ts';
import { BaseCodeMirrorEditor, BaseCodeMirrorEditorProps } from './BaseCodeMirrorEditor.tsx';
import { JSX } from '../src.deps.ts';

export const IsIsland = true;

export type CodeMirrorEditorProps = Omit<BaseCodeMirrorEditorProps, 'doc'> & {
  extensions?: Extension[];
  fileContent?: ReadableStream<Uint8Array> | string;
};

export default function CodeMirrorEditor({
  fileContent = '',
  extensions,
  onContentChange,
  ...props
}: CodeMirrorEditorProps): JSX.Element {
  return (
    <BaseCodeMirrorEditor
      {...props}
      doc={fileContent}
      onContentChange={onContentChange}
      extensions={extensions ?? [javascript()]}
    />
  );
}
