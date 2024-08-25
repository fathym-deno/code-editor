import { CodeEditorFile } from '../models/CodeEditorFile.ts';
import { classSet, JSX, useEffect, useState } from '../src.deps.ts';
import CodeMirrorEditor from './CodeMirrorEditor.tsx';

export const IsIsland = true;

export type FilesPanelProps = {
  activeFile?: string;

  files?: Record<string, CodeEditorFile>;

  onFileClick?: (
    codeSourceLookup: string,
    filePath: string,
  ) => void | Promise<void>;

  onFileRemove?: (fileLookup: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function FilesPanel({
  activeFile,
  files,
  onFileClick,
  onFileRemove,
  ...props
}: FilesPanelProps): JSX.Element {
  const fileLookups = Object.keys(files || {});

  const [activeFileLookup, setActiveFileLookup] = useState<string | undefined>(
    activeFile || fileLookups[0],
  );

  const [activeCodeFile, setActiveCodeFile] = useState<CodeEditorFile>();

  const [activeFileContents, setActiveFileContents] = useState<ReadableStream<Uint8Array>>();

  const handleFileTabClick = (codeSourceLookup: string, filePath: string) => {
    onFileClick?.(codeSourceLookup, filePath);
  };

  const handleFileRemoveClick = (
    fileLookup: string,
    e: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    onFileRemove?.(fileLookup);
  };

  useEffect(() => {
    if (activeFile) {
      setActiveFileLookup(activeFile);
    } else {
      setActiveFileLookup(undefined);
    }
  }, [activeFile]);

  useEffect(() => {
    if (activeFileLookup) {
      setActiveCodeFile(files?.[activeFileLookup]);
    } else {
      setActiveCodeFile(undefined);
    }
  }, [activeFileLookup, files]);

  useEffect(() => {
    const work = async () => {
      if (activeCodeFile) {
        const contents = await fetch(activeCodeFile.DownloadPath);

        setActiveFileContents(contents.body!);
      } else {
        setActiveFileContents(undefined);
      }
    };

    work();
  }, [activeCodeFile]);

  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      <div class='w-full mt-2 overflow-x-auto overflow-y-hidden border-b border-gray-300 dark:border-gray-700'>
        <div class='w-full overflow-x-auto'>
          <div class='px-2 flex flex-nowrap space-x-2'>
            {fileLookups.map((fl, index) => {
              const [codeSourceLookup, fileLookup] = fl.split('|');

              const isActive = fl === activeFileLookup;

              return (
                <div
                  key={index}
                  onClick={() => handleFileTabClick(codeSourceLookup, fileLookup)}
                  class={classSet([
                    'flex-none px-4 py-2 cursor-pointer rounded-t-md',
                    'hover:bg-gray-300 dark:hover:bg-gray-700',
                    isActive
                      ? 'bg-gray-400 dark:bg-gray-600 shadow-md'
                      : 'bg-gray-200 dark:bg-gray-800',
                  ])}
                >
                  <span>{fileLookup}</span>

                  <button
                    onClick={(e) => handleFileRemoveClick(fl, e)}
                    class='ml-2 text-red-500 hover:text-red-700'
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div class='h-full flex flex-row items-stretch overflow-hidden'>
        <div class='flex-1 overflow-y-auto'>
          {activeFileLookup && activeFileContents && (
            <CodeMirrorEditor fileContent={activeFileContents} />
          )}
        </div>
      </div>
    </div>
  );
}
