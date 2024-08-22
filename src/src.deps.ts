export { type ComponentChildren, type JSX } from 'npm:preact@10.20.1';

export * from 'jsr:@fathym/common@0';

export * from 'jsr:@fathym/atomic@0';

// export * as monaco from 'npm:monaco-editor/esm/vs/editor/editor.main.js';
export { DiffEditor, Editor, loader, useMonaco } from 'npm:@monaco-editor/react@4.6.0';

export const IS_BROWSER = typeof document !== 'undefined';
