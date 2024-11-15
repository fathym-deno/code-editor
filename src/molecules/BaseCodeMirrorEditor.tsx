import { useEffect, useRef, useState } from 'preact/hooks';
import {
  basicSetup,
  cobalt,
  EditorState,
  EditorView,
  Extension,
  ViewUpdate,
} from '../codemirror.deps.ts';
import { classSet, JSX, toText } from '../src.deps.ts';

export type BaseCodeMirrorEditorProps = {
  doc: ReadableStream<Uint8Array> | string;
  extensions?: Extension[];
  lineWrapping?: boolean;
  onContentChange?: (content: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function BaseCodeMirrorEditor({
  doc,
  extensions,
  lineWrapping = true,
  onContentChange,
  ...props
}: BaseCodeMirrorEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>();
  const [fileContent, setFileContent] = useState<string>(
    typeof doc === 'string' ? doc : '',
  );

  useEffect(() => {
    const setLocalFileContent = (text: string) => {
      if (editor?.state.doc.toString() !== text) {
        setFileContent(text);
      }
    };

    if (typeof doc === 'object' && doc instanceof ReadableStream) {
      toText(doc).then((text: string) => setLocalFileContent(text));
    } else {
      setLocalFileContent(doc);
    }
  }, [doc]);

  useEffect(() => {
    if (editorRef?.current && !editor) {
      const editorInstance = new EditorView({
        parent: editorRef.current,
        state: EditorState.create({
          doc: typeof fileContent === 'string' ? fileContent : '',
          extensions: [
            basicSetup,
            cobalt,
            lineWrapping ? EditorView.lineWrapping : [],
            ...(extensions ?? []),
            EditorView.updateListener.of((update: ViewUpdate) => {
              if (update.docChanged && onContentChange) {
                onContentChange(update.state.doc.toString());
              }
            }),
          ],
        }),
      });

      setEditor(editorInstance);
      return () => editorInstance.destroy();
    }
  }, [fileContent, onContentChange]);

  useEffect(() => {
    const updateEditorContent = () => {
      if (editor) {
        editor.setState(
          EditorState.create({
            doc: fileContent,
            extensions: [
              basicSetup,
              cobalt,
              lineWrapping ? EditorView.lineWrapping : [],
              ...(extensions ?? []),
            ],
          }),
        );
      }
    };

    updateEditorContent();
  }, [fileContent]);

  return (
    <div
      {...props}
      ref={editorRef}
      class={classSet(
        [
          '-:h-full [&>.cm-editor]:h-full -:min-h-full [&>.cm-editor]:min-h-full -:w-full',
        ],
        props,
      )}
    />
  );
}
