import { useEffect, useRef, useState } from 'preact/hooks';
import { classSet, IS_BROWSER, JSX, toText } from '../src.deps.ts';
import {
  basicSetup,
  cobalt,
  EditorState,
  EditorView,
  javascript,
  ViewUpdate,
} from '../codemirror.deps.ts';

export const IsIsland = true;

export type CodeMirrorEditorProps = {
  fileContent?: ReadableStream<Uint8Array> | string;
  onContentChange?: (content: string) => void; // New prop to handle content changes
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function CodeMirrorEditor({
  fileContent,
  onContentChange,
  ...props
}: CodeMirrorEditorProps): JSX.Element {
  if (!IS_BROWSER) {
    return <></>;
  }

  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView>();

  useEffect(() => {
    if (editorRef?.current && !editor) {
      const editorInstance = new EditorView({
        parent: editorRef.current,
        state: EditorState.create({
          doc: typeof fileContent === 'string' ? fileContent : '',
          extensions: [
            javascript(),
            basicSetup,
            cobalt,
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
    const updateEditorContent = async () => {
      const content =
        typeof fileContent === 'string'
          ? fileContent
          : fileContent && !fileContent.locked
          ? await toText(fileContent)
          : '';
      if (editor) {
        editor.setState(
          EditorState.create({
            doc: content,
            extensions: [javascript(), basicSetup, cobalt],
          })
        );
      }
    };

    updateEditorContent();
  }, [fileContent]);

  return (
    <div
      {...props}
      class={classSet(
        [
          '-:w-full -:h-full -:[&>.cm-editor]:h-full -:[&>.ͼ2v]:bg-[#00254be1]',
        ],
        props
      )}
      ref={editorRef}
    />
  );
}
