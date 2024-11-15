import { Extension, javascript, unifiedMergeView } from '../codemirror.deps.ts';
import { BaseCodeMirrorEditor, BaseCodeMirrorEditorProps } from './BaseCodeMirrorEditor.tsx';

export type CodeMirrorUnifiedMergeEditorProps =
  & Omit<
    BaseCodeMirrorEditorProps,
    'doc' | 'extensions'
  >
  & {
    extensions?: Extension[];
    originalContent: string;
    modifiedContent: string;
  };

export default function CodeMirrorUnifiedMergeEditor({
  extensions,
  originalContent,
  modifiedContent,
  onContentChange,
  ...props
}: CodeMirrorUnifiedMergeEditorProps) {
  return (
    <BaseCodeMirrorEditor
      {...props}
      doc={modifiedContent}
      onContentChange={onContentChange}
      extensions={[
        ...(extensions ?? [javascript()]),
        unifiedMergeView({
          original: originalContent, // Original content for comparison
          highlightChanges: true, // Highlights differences
          gutter: true, // Optional gutter display
          syntaxHighlightDeletions: true, // Syntax highlighting for deletions
          mergeControls: true, // Accept/reject controls for changes
        }),
      ]}
    />
  );
}
