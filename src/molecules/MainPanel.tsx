import { classSet, JSX } from '../src.deps.ts';
import { MonacoEditor } from './MonacoEditor.tsx';

export type MainPanelProps = {
  files?: string[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export function MainPanel({ files, ...props }: MainPanelProps): JSX.Element {
  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      <div class='w-full mt-2 overflow-x-auto overflow-y-hidden border-b border-gray-300 dark:border-gray-700'>
        <div class='w-full overflow-x-auto'>
          <div class='px-2 flex flex-nowrap space-x-2'>
            {files?.map((file, index) => {
              const isActive = !index;

              return (
                <div
                  key={index}
                  class={classSet([
                    'flex-none px-4 py-2 cursor-pointer rounded-t-md',
                    'hover:bg-gray-300 dark:hover:bg-gray-700',
                    isActive
                      ? 'bg-gray-400 dark:bg-gray-600 shadow-md'
                      : 'bg-gray-200 dark:bg-gray-800',
                  ])}
                >
                  {file}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div class='h-full flex flex-row items-stretch overflow-hidden'>
        <div class='flex-1 border border-yellow-500 overflow-y-auto'>
          <MonacoEditor
            fileContent={[
              `function x() {', '\tconsole.log("Hello world!");', '}`,
            ].join('\n')}
          />
        </div>
      </div>
    </div>
  );
}
