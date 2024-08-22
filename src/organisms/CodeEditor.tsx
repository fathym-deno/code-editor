import { MainPanel } from '../molecules/MainPanel.tsx';
import { SidePanel } from '../molecules/SidePanel.tsx';
import { classSet, JSX } from '../src.deps.ts';

export type CodeEditorProps = {
  files?: string[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export function CodeEditor({ files, ...props }: CodeEditorProps): JSX.Element {
  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      <div class='shadow-md'>
        <h1>Code Editor</h1>
      </div>

      <div class='h-full flex flex-row items-stretch overflow-hidden'>
        <div class='w-[250px] flex-none border border-red-500 overflow-y-auto'>
          <SidePanel />
        </div>

        <div class='flex-grow overflow-hidden'>
          <MainPanel files={files} />
        </div>
      </div>
    </div>
  );
}
