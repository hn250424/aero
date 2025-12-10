import { createPlaygroundEditors } from "./docs/playground/editors";
import { liElements } from "./docs/playground/elements";
import * as widgets from "./docs/playground/widgets";

document.addEventListener("DOMContentLoaded", () => {
	const { htmlEditor, cssEditor, javascriptEditor } = createPlaygroundEditors()

	liElements.forEach((el) => {
		el.addEventListener("click", () => {
			htmlEditor.dispatch({
				changes: {
					from: 0,
					to: htmlEditor.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].html,
				},
			});

			cssEditor.dispatch({
				changes: {
					from: 0,
					to: cssEditor.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].css,
				},
			});

			javascriptEditor.dispatch({
				changes: {
					from: 0,
					to: javascriptEditor.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].js,
				},
			});
		});
	});

	htmlEditor.dispatch({
		changes: {
			from: 0,
			to: htmlEditor.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].html,
		},
	});
	cssEditor.dispatch({
		changes: {
			from: 0,
			to: cssEditor.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].css,
		},
	});
	javascriptEditor.dispatch({
		changes: {
			from: 0,
			to: javascriptEditor.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].js,
		},
	});
});

