import "./components_playground.css";

import type { ComponentKeys } from "@site/domain/component";
import type { PlaygroundEditors } from "./domain";

import { widgets } from "./widgets";

export type { PlaygroundEditors, PlaygroundWidgets } from "./domain";

export { createPlaygroundEditors } from "./editors";

export function applyWidgetToPlayground(editors: PlaygroundEditors, key: ComponentKeys) {
	applyWidget(key, editors);
}

function applyWidget(
	key: ComponentKeys,
	editors: PlaygroundEditors
) {
	const widget = widgets[key];

	editors.htmlEditor.dispatch({
		changes: {
			from: 0,
			to: editors.htmlEditor.state.doc.length,
			insert: widget.html,
		},
	});

	editors.cssEditor.dispatch({
		changes: {
			from: 0,
			to: editors.cssEditor.state.doc.length,
			insert: widget.css,
		},
	});

	editors.javascriptEditor.dispatch({
		changes: {
			from: 0,
			to: editors.javascriptEditor.state.doc.length,
			insert: widget.js,
		},
	});
}
