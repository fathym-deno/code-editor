import { classSet, JSX, useEffect, useState } from '../src.deps.ts';
import { CodeSource } from '../models/CodeSource.ts';
import FilesPanel from '../molecules/FilesPanel.tsx';
import SidePanel from '../molecules/SidePanel.tsx';
import { CodeEditorFile } from '../models/CodeEditorFile.ts';
import { CodeChangesProfile } from '../models/CodeChangesProfile.ts';

export const IsIsland = true;

export type CodeEditorProps = {
  changes: CodeChangesProfile;

  recommendedFiles?: string[];

  sources: Record<string, CodeSource>;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function CodeEditor({
  changes,
  recommendedFiles,
  sources,
  id,
  title,
  ...props
}: CodeEditorProps): JSX.Element {
  const openFilesKey = `FathymAtomicCodeEditor|OpenFiles|${id || 'undefined'}`;

  const [openFileLookups, setOpenFileLookups] = useState<string[]>(
    JSON.parse(localStorage.getItem(openFilesKey) || '[]')
  );

  const [openFilesMap, setOpenFilesMap] = useState<
    Record<string, CodeEditorFile>
  >({});

  const [activeFile, setActiveFile] = useState(
    localStorage.getItem(`${openFilesKey}|ActiveFile`) || ''
  );

  const configureActiveFile = (activeFile?: string) => {
    localStorage.setItem(`${openFilesKey}|ActiveFile`, activeFile || '');

    setActiveFile(activeFile || '');
  };

  const handleFileClick = (
    codeSourceLookup: string,
    actionPath: string
  ): void => {
    const fileKey = [codeSourceLookup, actionPath].join('|');

    if (
      !openFileLookups.some((fileLookup) => {
        return fileLookup === fileKey;
      })
    ) {
      localStorage.setItem(
        openFilesKey,
        JSON.stringify([...openFileLookups, fileKey])
      );

      setOpenFileLookups([...openFileLookups, fileKey]);
    } else {
      setOpenFileLookups([...openFileLookups]);
    }

    configureActiveFile(fileKey);
  };

  const handleFileDelete = (fileLookup: string): void => {
    const newFileLookups = openFileLookups.filter(
      (lookup) => lookup !== fileLookup
    );

    const newOpenFiles = { ...openFilesMap };

    delete newOpenFiles[fileLookup];

    localStorage.setItem(openFilesKey, JSON.stringify(newFileLookups));

    setOpenFileLookups(newFileLookups);

    setOpenFilesMap(newOpenFiles);

    if (fileLookup === activeFile) {
      configureActiveFile(newFileLookups[0]);
    }
  };

  useEffect(() => {
    const openFilesMap = openFileLookups.reduce((acc, afKey) => {
      const [codeSourceLookup, fileLookup] = afKey.split('|');

      const codeSource = sources[codeSourceLookup];

      if (fileLookup in (codeSource?.Files || {})) {
        acc[afKey] = codeSource!.Files[fileLookup];
      }

      return acc;
    }, {} as Record<string, CodeEditorFile>);

    setOpenFilesMap(openFilesMap);
  }, [activeFile, openFileLookups]);

  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      <div class="shadow-md">
        <h1>{title}</h1>
      </div>

      <div class="h-full flex flex-row items-stretch overflow-hidden">
        <div class="w-[300px] flex-none overflow-y-auto shadow-lg">
          <SidePanel
            changes={changes}
            recommendedFiles={recommendedFiles}
            sources={sources}
            onFileClick={handleFileClick}
          />
        </div>

        <div class="flex-grow overflow-hidden">
          <FilesPanel
            activeFile={activeFile}
            files={openFilesMap}
            onFileClick={handleFileClick}
            onFileDelete={handleFileDelete}
          />
        </div>
      </div>
    </div>
  );
}
