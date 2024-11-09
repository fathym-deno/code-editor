import {
  unifiedMergeView,
  javascript,
  basicSetup,
} from '../codemirror.deps.ts';
import {
  BaseCodeMirrorEditor,
  BaseCodeMirrorEditorProps,
} from './BaseCodeMirrorEditor.tsx';
import { JSX } from '../src.deps.ts';

export type CodeMirrorMergeEditorProps = Omit<
  BaseCodeMirrorEditorProps,
  'doc'
> & {
  originalContent: string;
  modifiedContent: string;
  onContentChange?: (content: string) => void;
};

export default function CodeMirrorMergeEditor({
  originalContent,
  modifiedContent,
  onContentChange,
  ...props
}: CodeMirrorMergeEditorProps): JSX.Element {
  return (
    <BaseCodeMirrorEditor
      {...props}
      doc={modifiedContent}
      onContentChange={onContentChange}
      extensions={[
        basicSetup,
        javascript(),
        unifiedMergeView({
          original: originalContent,
          modified: modifiedContent,
          showDifferences: true,
        }),
      ]}
    />
  );
}
