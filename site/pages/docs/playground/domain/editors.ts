import { EditorView } from "@codemirror/view";

export type PlaygroundEditors = {
	htmlEditor: EditorView,
	cssEditor: EditorView,
	javascriptEditor: EditorView,
	dispose(): void;
}
