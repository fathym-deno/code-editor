import { useEffect, useRef, useState } from 'preact/hooks';
import { classSet, IS_BROWSER, JSX, toText } from '../src.deps.ts';
import { basicSetup, cobalt, EditorState, EditorView, javascript } from '../codemirror.deps.ts';

export const IsIsland = true;

export type CodeMirrorEditorProps = {
  fileContent?: ReadableStream<Uint8Array>;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function CodeMirrorEditor({
  fileContent,
  ...props
}: CodeMirrorEditorProps): JSX.Element {
  if (!IS_BROWSER) {
    return <></>;
  }

  const editorRef = useRef<HTMLDivElement>(null);

  const [editor, setEditor] = useState<EditorView>();

  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    if (editorRef?.current) {
      console.log('editorRef');
      const editor = new EditorView({
        parent: editorRef.current,
      });

      setEditor(editor);

      return () => {
        editor.destroy();
      };
    }
  }, [editorRef]);

  useEffect(() => {
    const work = async () => {
      const fc = fileContent && !fileContent.locked ? await toText(fileContent) : '';

      setEditorState(
        EditorState.create({
          doc: fc,
          extensions: [javascript(), basicSetup, cobalt],
        }),
      );
    };

    work();
  }, [fileContent]);

  useEffect(() => {
    if (editor && editorState) {
      editor.setState(editorState);
    }
  }, [editor, editorState]);

  return (
    <div
      {...props}
      class={classSet(['-:w-full -:h-full -:[&>.cm-editor]:h-full'], props)}
      ref={editorRef}
    >
    </div>
  );
}
