import "./docs_playground.css"

import type { ComponentKeys } from "../domain/component";
import type { PlaygroundEditors } from "./domain";

import { subscribeComponentChange } from "../store/component";
import { createPlaygroundEditors } from "./editors";
import { widgets } from "./widgets";

export default function initDocsPlayground() {
	const $htmlBox = document.querySelector(".html-box") as HTMLElement;
	const $cssBox = document.querySelector(".css-box") as HTMLElement;
	const $javascriptBox = document.querySelector(".javascript-box") as HTMLElement;
	const $playgroundIframe = document.querySelector(".playground-iframe") as HTMLIFrameElement;

	const editors = createPlaygroundEditors($htmlBox, $cssBox, $javascriptBox, $playgroundIframe);

	subscribeComponentChange(key => {
		applyWidget(key as ComponentKeys, editors);
	})
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
