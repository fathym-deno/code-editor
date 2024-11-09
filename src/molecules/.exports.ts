import { JSX } from '../src.deps.ts';

import { CodeMirrorEditorProps } from './CodeMirrorEditor.tsx';
export { type CodeMirrorEditorProps } from './CodeMirrorEditor.tsx';
export const CodeMirrorEditor: (props: CodeMirrorEditorProps) => JSX.Element = (
  await import('./CodeMirrorEditor.tsx')
).default;

import { CodeMirrorSideBySideMergeEditorProps } from './CodeMirrorSideBySideMergeEditor.tsx';
export { type CodeMirrorSideBySideMergeEditorProps } from './CodeMirrorSideBySideMergeEditor.tsx';
export const CodeMirrorSideBySideMergeEditor: (props: CodeMirrorSideBySideMergeEditorProps) => JSX.Element = (
  await import('./CodeMirrorSideBySideMergeEditor.tsx')
).default;

import { CodeMirrorUnifiedMergeEditorProps } from './CodeMirrorUnifiedMergeEditor.tsx';
export { type CodeMirrorUnifiedMergeEditorProps } from './CodeMirrorUnifiedMergeEditor.tsx';
export const CodeMirrorUnifiedMergeEditor: (props: CodeMirrorUnifiedMergeEditorProps) => JSX.Element = (
  await import('./CodeMirrorUnifiedMergeEditor.tsx')
).default;

import { FilesPanelProps } from './FilesPanel.tsx';
export { type FilesPanelProps } from './FilesPanel.tsx';
export const FilesPanel: (props: FilesPanelProps) => JSX.Element = (
  await import('./FilesPanel.tsx')
).default;

import { OverlayDiffEditorProps } from './OverlayDiffEditor.tsx';
export { type OverlayDiffEditorProps } from './OverlayDiffEditor.tsx';
export const OverlayDiffEditor: (props: OverlayDiffEditorProps) => JSX.Element = (
  await import('./OverlayDiffEditor.tsx')
).default;

import { SidePanelProps } from './SidePanel.tsx';
export { type SidePanelProps } from './SidePanel.tsx';
export const SidePanel: (props: SidePanelProps) => JSX.Element = (
  await import('./SidePanel.tsx')
).default;

// import { MonacoEditorProps } from './MonacoEditor.tsx';
// export { type MonacoEditorProps } from './MonacoEditor.tsx';
// export const MonacoEditor: (props: MonacoEditorProps) => JSX.Element = (
//   await import('./MonacoEditor.tsx')
// ).default;
