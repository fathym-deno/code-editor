import { useEffect, useRef, useState } from 'preact/hooks';
import {
  EditorState,
  EditorView,
  Extension,
  ViewUpdate,
} from '../codemirror.deps.ts';
import { JSX } from '../src.deps.ts';

export type BaseCodeMirrorEditorProps = {
  doc: string | ReadableStream<Uint8Array>;
  extensions?: Extension[];
  onContentChange?: (content: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function BaseCodeMirrorEditor({
  doc,
  extensions = [],
  onContentChange,
  ...props
}: BaseCodeMirrorEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>();

  useEffect(() => {
    if (editorRef.current && !editor) {
      const editorInstance = new EditorView({
        state: EditorState.create({
          doc: typeof doc === 'string' ? doc : '',
          extensions: [
            ...extensions,
            EditorView.updateListener.of((update: ViewUpdate) => {
              if (update.docChanged && onContentChange) {
                onContentChange(update.state.doc.toString());
              }
            }),
          ],
        }),
        parent: editorRef.current,
      });

      setEditor(editorInstance);
      return () => editorInstance.destroy();
    }
  }, [doc, extensions, onContentChange]);

  useEffect(() => {
    const updateEditorContent = async () => {
      const content =
        typeof doc === 'string' ? doc : await new Response(doc).text();
      if (editor) {
        editor.dispatch({
          changes: { from: 0, to: editor.state.doc.length, insert: content },
        });
      }
    };
    updateEditorContent();
  }, [doc]);

  return <div {...props} ref={editorRef} class="h-full w-full" />;
}
