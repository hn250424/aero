import { EditorView } from "@codemirror/view";
import { createPlaygroundEditors } from "./editors";
import * as widgets from "./widgets";

export default function initDocsPlayground() {
	const $liElements = document.querySelectorAll(
		".docs-container-aside nav li"
	) as NodeListOf<HTMLElement>;

	const $htmlBox = document.querySelector(".html-box") as HTMLElement;
	const $cssBox = document.querySelector(".css-box") as HTMLElement;
	const $javascriptBox = document.querySelector(".javascript-box") as HTMLElement;
	const $playgroundIframe = document.querySelector(".playground-iframe") as HTMLIFrameElement;

	const editors = createPlaygroundEditors($htmlBox, $cssBox, $javascriptBox, $playgroundIframe);

	bindLiEvents($liElements, editors);

	const firstKey = $liElements[0].dataset.key as keyof typeof widgets;
	applyWidgetToEditors(firstKey, editors);
}

function bindLiEvents(
	$liElements: NodeListOf<HTMLElement>,
	editors: {
		htmlEditor: EditorView,
		cssEditor: EditorView,
		javascriptEditor: EditorView,
	}
) {
	$liElements.forEach((el) => {
		el.addEventListener("click", () => {
			applyWidgetToEditors(el.dataset.key as keyof typeof widgets, editors);
		});
	});
}

function applyWidgetToEditors<T extends keyof typeof widgets>(
	key: T,
	editors: {
		htmlEditor: EditorView,
		cssEditor: EditorView,
		javascriptEditor: EditorView,
	}
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
