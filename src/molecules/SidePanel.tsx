import { classSet, JSX } from '../src.deps.ts';

export type SidePanelProps = JSX.HTMLAttributes<HTMLDivElement>;

export function SidePanel({ ...props }: SidePanelProps): JSX.Element {
  return (
    <div
      {...props}
      class={classSet(['-:w-full h-full -:flex -:flex-col'], props)}
    >
      SidePanel
    </div>
  );
}
