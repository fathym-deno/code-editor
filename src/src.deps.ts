export { type ComponentChildren, type FunctionalComponent, type JSX } from 'npm:preact@10.20.1';
export { type ForwardedRef, forwardRef } from 'npm:preact@10.20.1/compat';
export * from 'npm:preact@10.20.1/hooks';

export * from 'jsr:@fathym/common@0.2.22';

// export * from '../../atomic/mod.ts';
export * from 'jsr:@fathym/atomic@0.0.165';

export { toText } from 'jsr:@std/streams@1.0.2';

// export * as monaco from 'npm:monaco-editor/esm/vs/editor/editor.main.js';
// export * as monaco from 'https://esm.sh/monaco-editor@0.50.0/esm/vs/editor/editor.main.js';

export { DiffEditor, Editor, loader, useMonaco } from 'npm:@monaco-editor/react@4.6.0';

export const IS_BROWSER = typeof document !== 'undefined';
