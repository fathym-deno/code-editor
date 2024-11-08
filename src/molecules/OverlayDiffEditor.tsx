import { useState } from 'preact/hooks';
import { JSX } from '../src.deps.ts';
import CodeMirrorEditor from './CodeMirrorEditor.tsx';

export type OverlayDiffEditorProps = {
  originalContent?: string;
  modifiedContent?: string;
  onContentChange?: (content: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function OverlayDiffEditor({
  originalContent = '',
  modifiedContent = '',
  onContentChange,
  ...props
}: OverlayDiffEditorProps): JSX.Element {
  const [dividerPosition, setDividerPosition] = useState(0.5); // 10% from the left

  // Handle resizing of the overlay editor
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    const container = (
      e.currentTarget as HTMLDivElement
    ).parentElement?.getBoundingClientRect();
    const onMouseMove = (e: MouseEvent) => {
      if (container) {
        const newLeft = e.clientX - container.left;
        // Subtract 1.5px to ensure the handle stays within the container bounds on the right side
        const constrainedLeft = Math.max(
          0,
          Math.min(newLeft, container.width / 2 - 1.5),
        );
        setDividerPosition(constrainedLeft / container.width);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div {...props} class='relative w-full h-full overflow-hidden'>
      {/* Original Content Editor (Left of Divider) */}
      <div
        class='absolute inset-y-0 left-0 overflow-hidden'
        style={{ width: `${dividerPosition * 100}%` }}
      >
        <CodeMirrorEditor
          class='w-full h-full [&>.cm-scrollbar]:hidden'
          fileContent={originalContent}
        />
      </div>

      {/* Modified Content Editor (Right of Divider) */}
      <div
        class='absolute inset-y-0 right-0 overflow-hidden'
        style={{ width: `${(1 - dividerPosition) * 100}%` }}
      >
        <CodeMirrorEditor
          class='w-full h-full [&>.cm-scrollbar]:hidden'
          fileContent={modifiedContent}
          onContentChange={onContentChange}
        />
      </div>

      {/* Draggable Divider */}
      <div
        class='absolute inset-y-0 w-[3px] bg-gray-600 cursor-col-resize z-10'
        style={{ left: `${dividerPosition * 100}%` }}
        onMouseDown={handleMouseDown}
      >
      </div>
    </div>
  );
}
