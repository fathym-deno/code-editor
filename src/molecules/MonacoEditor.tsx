import { classSet, Editor, IS_BROWSER, JSX } from '../src.deps.ts';

export const IsIsland = true;

export type MonacoEditorProps = {
  fileContent: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function MonacoEditor({
  fileContent,
  ...props
}: MonacoEditorProps): JSX.Element {
  if (!IS_BROWSER) {
    return <></>;
  }
  // const monacoRef = useRef(null);

  // useEffect(() => {
  //   self.MonacoEnvironment = {
  //     getWorkerUrl: function (_moduleId, label) {
  //       if (label === 'json') {
  //         return './vs/language/json/json.worker.js';
  //       }
  //       if (label === 'css' || label === 'scss' || label === 'less') {
  //         return './vs/language/css/css.worker.js';
  //       }
  //       if (label === 'html' || label === 'handlebars' || label === 'razor') {
  //         return './vs/language/html/html.worker.js';
  //       }
  //       if (label === 'typescript' || label === 'javascript') {
  //         return './vs/language/typescript/ts.worker.js';
  //       }
  //       return './vs/editor/editor.worker.js';
  //     },
  //   };
  // }, []);

  // useEffect(() => {
  //   if (monacoRef.current) {
  //     // deno-lint-ignore no-explicit-any
  //     const editor = (monaco.editor as any).create(monacoRef.current, {
  //       value: fileContent || '',
  //       language: 'typescript',
  //     });

  //     return () => editor.dispose();
  //   }
  // }, [fileContent, monacoRef]);

  // return <div {...props}></div>;

  console.log(Editor);
  return (
    <Editor
      {...props}
      class={classSet(['-:w-full h-full'], props)}
      defaultLanguage='typescript'
      defaultValue={fileContent}
    />
  );
}
