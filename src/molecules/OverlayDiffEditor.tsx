import { useState } from 'preact/hooks';
import { classSet, JSX } from '../src.deps.ts';
import CodeMirrorEditor from './CodeMirrorEditor.tsx';
import CodeMirrorUnifiedMergeEditor from './CodeMirrorUnifiedMergeEditor.tsx';
import { EditorState, Extension } from '../codemirror.deps.ts';

export type OverlayDiffEditorProps = {
  extensions?: Extension[];
  originalContent?: string;
  modifiedContent?: string;
  onContentChange?: (content: string) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function OverlayDiffEditor({
  extensions,
  originalContent = '',
  modifiedContent = '',
  onContentChange,
  ...props
}: OverlayDiffEditorProps): JSX.Element {
  const [dividerPosition, setDividerPosition] = useState(0.05); // 10% from the left

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
          Math.min(newLeft, container.width - 3),
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
    <div {...props} class={classSet(['relative w-full h-full overflow-hidden'], props)}>
      {/* Original Content Editor (Left of Divider) */}
      <div
        class='relative inset-y-0'
        style={{ width: `100%` }}
      >
        <CodeMirrorEditor
          extensions={[EditorState.readOnly.of(true), ...(extensions ?? [])]}
          fileContent={originalContent}
        />
      </div>

      {/* Modified Content Editor (Right of Divider) */}
      <div
        class='absolute inset-y-0 right-0'
        style={{ width: `${(1 - dividerPosition) * 100}%` }}
      >
        <CodeMirrorUnifiedMergeEditor
          originalContent={originalContent}
          modifiedContent={modifiedContent}
          extensions={extensions}
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
