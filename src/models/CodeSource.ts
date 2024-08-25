import { CodeEditorFile } from './CodeEditorFile.ts';

export type CodeSource = {
  Files: Record<string, CodeEditorFile>;
};
