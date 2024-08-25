// import {
//   classSet,
//   IS_BROWSER,
//   JSX,
//   useEffect,
//   useRef,
//   useState,
// } from '../src.deps.ts';

// export * as monaco from 'https://esm.sh/monaco-editor@0.50.0/min/vs/editor/editor.main.js';

// export const IsIsland = true;

// export type MonacoEditorProps = {
//   fileContent: string;
// } & JSX.HTMLAttributes<HTMLDivElement>;

// export default function MonacoEditor({
//   fileContent,
//   ...props
// }: MonacoEditorProps): JSX.Element {
//   if (!IS_BROWSER) {
//     return <></>;
//   }

//   const monacoRef = useRef(null);

//   // const [monaco, setMonaco] = useState<any>();

//   useEffect(() => {
//     // import(
//     //   'https://esm.sh/monaco-editor@0.50.0/esm/vs/editor/editor.main.js'
//     // ).then((monaco) => {
//     //   setMonaco(monaco);
//     // });

//     // self.MonacoEnvironment = {
//     //   getWorkerUrl: function (_moduleId, label) {
//     //     if (label === 'json') {
//     //       return './vs/language/json/json.worker.js';
//     //     }
//     //     if (label === 'css' || label === 'scss' || label === 'less') {
//     //       return './vs/language/css/css.worker.js';
//     //     }
//     //     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//     //       return './vs/language/html/html.worker.js';
//     //     }
//     //     if (label === 'typescript' || label === 'javascript') {
//     //       return './vs/language/typescript/ts.worker.js';
//     //     }
//     //     return './vs/editor/editor.worker.js';
//     //   },
//     // };
//   }, []);

//   useEffect(() => {
//     if (monaco && monacoRef.current) {
//       // deno-lint-ignore no-explicit-any
//       const editor = (monaco.editor as any).create(monacoRef.current, {
//         value: fileContent || '',
//         language: 'typescript',
//       });

//       return () => editor.dispose();
//     }
//   }, [fileContent, monacoRef]);

//   return <div {...props} class={classSet(['-:w-full h-full'], props)}></div>;

//   // console.log(Editor);
//   // return (
//   //   <Editor.type
//   //     {...props}
//   //     class={classSet(['-:w-full h-full'], props)}
//   //     defaultLanguage="typescript"
//   //     defaultValue={fileContent}
//   //   />
//   // );
// }
