import { useEffect, useRef, useState } from 'preact/hooks';
import { classSet, IS_BROWSER, JSX, toText } from '../src.deps.ts';
import { javascript } from 'npm:@codemirror/lang-javascript@6.2.2';
import { basicSetup } from 'npm:codemirror@6.0.1';
import { EditorState } from 'npm:@codemirror/state@6.4.1';
import { EditorView } from 'npm:@codemirror/view@6.32.0';
import { cobalt } from 'npm:thememirror@2.0.1';

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
    if (editorRef.current) {
      const editor = new EditorView({
        parent: editorRef.current,
      });

      setEditor(editor);

      return () => editor.destroy();
    }
  }, [editorRef.current]);

  useEffect(() => {
    const work = async () => {
      if (editor) {
        const fc = fileContent && !fileContent.locked ? await toText(fileContent) : '';

        if (!editorState || fc || !fileContent?.locked) {
          setEditorState(
            EditorState.create({
              doc: fc,
              extensions: [javascript(), basicSetup, cobalt],
            }),
          );
        }
      }
    };

    work();
  }, [editor, fileContent]);

  useEffect(() => {
    if (editor && editorState) {
      editor.setState(editorState);
    }
  }, [editorState]);

  return (
    <div
      {...props}
      class={classSet(['-:w-full -:h-full -:[&>.cm-editor]:h-full'], props)}
      ref={editorRef}
    >
    </div>
  );
}
