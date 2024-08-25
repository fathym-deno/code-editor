import { CodeChangesProfile } from '../models/CodeChangesProfile.ts';
import { CodeSource } from '../models/CodeSource.ts';
import {
  classSet,
  Collapsible,
  CollapsibleProps,
  FileList,
  JSX,
  useEffect,
  useState,
} from '../src.deps.ts';

export const IsIsland = true;

export type SidePanelProps = {
  changes: CodeChangesProfile;

  onFileClick?: (
    codeSourceLookup: string,
    actionPath: string
  ) => void | Promise<void>;

  recommendedFiles?: string[];

  sources: Record<string, CodeSource>;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function SidePanel({
  changes,
  sources,
  onFileClick,
  recommendedFiles,
  ...props
}: SidePanelProps): JSX.Element {
  const [recommendations, setRecommendations] = useState<string[]>();

  const codeSourceLookups = Object.keys(sources || {});

  const CoreCollapsible = (cProps: CollapsibleProps) => {
    return (
      <Collapsible
        {...cProps}
        class={classSet(
          [
            '[&>.collapsible-title]:bg-gray-200 [&>.collapsible-title]:dark:bg-gray-800',
            '[&>.collapsible-title]:hover:bg-gray-300 [&>.collapsible-title]:dark:hover:bg-gray-700',
          ],
          cProps
        )}
      />
    );
  };

  const buildCodeTasksCollapsible = (
    task: CodeChangesProfile,
    index: number,
    hasOpened: { value: boolean }
  ) => {
    const shouldOpen = !hasOpened.value && !task.Complete;

    hasOpened.value = hasOpened.value || !task.Complete;

    const taskHasOpened = { value: false };

    return (
      <Collapsible
        key={index}
        id={task.Lookup}
        title={task.Name}
        isOpenDefault={shouldOpen}
        class={classSet([
          task.Complete ? '[&>.collapsible-title]:text-green-500' : '',
        ])}
      >
        <div>
          <p class="ml-8 text-xs text-slate-700 dark:text-slate-400">
            {task.Description}
          </p>

          {task.Tasks?.map((tsk, i) => (
            <div class="ml-4">
              {buildCodeTasksCollapsible(
                tsk,
                Number.parseInt(`${index}${i + 1}`),
                taskHasOpened
              )}
            </div>
          ))}
        </div>
      </Collapsible>
    );
  };

  const hasOpened = { value: false };

  useEffect(() => {
    const rfs =
      recommendedFiles?.map((recommendedFile) => {
        const split = ['', ...recommendedFile.split('|')];

        return split.join('/');
      }) || [];

    setRecommendations(rfs);
  }, [recommendedFiles]);

  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      <CoreCollapsible title="Code Changes" isOpenDefault>
        <div class="m-2">
          <h2 class="text-lg">{changes.Name}</h2>

          <p class="text-sm text-slate-700 dark:text-slate-400">
            {changes.Description}
          </p>

          {changes.Tasks?.map((task, i) => {
            return buildCodeTasksCollapsible(task, i + 1, hasOpened);
          })}
        </div>
      </CoreCollapsible>

      <div>
        {!!recommendations?.length && (
          <CoreCollapsible title="Recommended" isOpenDefault>
            <div class="m-2">
              <FileList
                files={recommendations || []}
                onFileClick={(ap) => {
                  const [codeSourceOrg, codeSourcePkg, ...actionPath] = ap
                    .split('/')
                    .slice(1);

                  onFileClick?.(
                    [codeSourceOrg, codeSourcePkg].join('/'),
                    [...actionPath].join('/')
                  );
                }}
              />
            </div>
          </CoreCollapsible>
        )}
      </div>

      <div>
        {codeSourceLookups.map((codeSourceLookup) => {
          const fileLookups = Object.keys(
            sources[codeSourceLookup].Files || {}
          );

          return (
            <CoreCollapsible title={codeSourceLookup}>
              <div class="m-2">
                <FileList
                  files={fileLookups}
                  onFileClick={(actionPath) =>
                    onFileClick?.(codeSourceLookup, actionPath)
                  }
                />
              </div>
            </CoreCollapsible>
          );
        })}
      </div>
    </div>
  );
}
