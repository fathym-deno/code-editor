import { classSet, JSX } from '../src.deps.ts';

export type CodeEditorProps = {
  Temp: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function CodeEditor({ ...props }: CodeEditorProps): JSX.Element {
  return (
    <div
      {...props}
      class={classSet(
        ['-:w-full h-full -:flex -:border-1 -:border-red-500'],
        props,
      )}
    >
      <h1>Code Editor</h1>
    </div>
  );
}
