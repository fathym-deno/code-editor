import { useEffect, useRef, useState } from 'preact/hooks';
import {
basicSetup,
  cobalt,
  EditorState,
  EditorView,
  Extension,
  ViewUpdate,
} from '../codemirror.deps.ts';
import { JSX, toText } from '../src.deps.ts';

export type BaseCodeMirrorEditorProps = {
  doc: ReadableStream<Uint8Array> | string;
  extensions?: Extension[];
  lineWrapping?: boolean;
  onContentChange?: (content: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function BaseCodeMirrorEditor({
  doc,
  extensions = [],
  lineWrapping = true,
  onContentChange,
  ...props
}: BaseCodeMirrorEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>();
  const [content, setContent] = useState<string>(
    typeof doc === 'string' ? doc : ''
  );

  useEffect(() => {
    if (typeof doc === 'object' && doc instanceof ReadableStream) {
      toText(doc).then((text: string) => setContent(text));
    } else {
      setContent(doc);
    }
  }, [doc]);

  useEffect(() => {
    if (editorRef.current && !editor) {
      const editorInstance = new EditorView({
        state: EditorState.create({
          doc: content,
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
        }),
        parent: editorRef.current,
      });

      setEditor(editorInstance);
      return () => editorInstance.destroy();
    }
  }, [content, extensions, onContentChange]);

  useEffect(() => {
    if (editor && content) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: content },
      });
    }
  }, [content]);

  return <div {...props} ref={editorRef} class="h-full w-full" />;
}
