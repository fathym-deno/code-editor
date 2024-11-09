import { useEffect, useRef } from 'preact/hooks';
import {
  EditorView,
  EditorState,
  basicSetup,
  MergeView,
  Extension,
  ViewUpdate,
  javascript,
  cobalt,
} from '../codemirror.deps.ts';
import { JSX } from '../src.deps.ts';

export type CodeMirrorSideBySideMergeEditorProps = {
  lineWrapping?: boolean;
  modifiedContent: string;
  onContentChange?: (content: string) => void;
  originalContent: string;
  extensions?: Extension[]; // Single set of extensions applied to both editors
};

export default function CodeMirrorSideBySideMergeEditor({
  extensions = [],
  lineWrapping = true,
  modifiedContent,
  onContentChange,
  originalContent,
}: CodeMirrorSideBySideMergeEditorProps): JSX.Element {
  const mergeViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mergeViewRef.current) {
      const mergeView = new MergeView({
        parent: mergeViewRef.current,
        a: {
          doc: originalContent,
          extensions: [
            basicSetup,
            cobalt,
            lineWrapping ? EditorView.lineWrapping : [],
            EditorState.readOnly.of(true),
            ...(extensions ?? [javascript()]),
          ],
        },
        b: {
          doc: modifiedContent,
          extensions: [
            basicSetup,
            cobalt,
            lineWrapping ? EditorView.lineWrapping : [],
            ...extensions,
            EditorView.updateListener.of((update: ViewUpdate) => {
              if (update.docChanged && onContentChange) {
                onContentChange(update.state.doc.toString());
              }
            }),
          ],
        },
        orientation: 'a-b', // Set left-to-right orientation
        revertControls: 'b-to-a', // Revert changes from modified to original
        highlightChanges: true,
        gutter: true,
        renderRevertControl: () => document.createElement("span"),
        // collapseUnchanged: { margin: 3, minSize: 4 }, // Optional: collapse unchanged lines
      });

      return () => mergeView.destroy();
    }
  }, [originalContent, modifiedContent, onContentChange, extensions]);

  return <div ref={mergeViewRef} class="h-full w-full overflow-auto" />;
}
