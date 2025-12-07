import { EditorView, basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import * as widgets from "./widgets";

document.addEventListener("DOMContentLoaded", () => {
	const updatePlayground = () => {
		const aeroImportPath = import.meta.env.DEV
			? "/src/index.ts"
			: `${import.meta.env.BASE_URL}aero.es.js`;

		const doc = `
			<html>
				<head>
					<style>
						* {
							padding: 0;
							margin: 0;
							box-sizing: border-box;
						}

						html,
						body {
							width: 100%;
							height: 100%;
						}
					</style>
					<style>${cssInput.state.doc.toString()}</style>
				</head>
				<body>
					${htmlInput.state.doc.toString()}
					<script type="module">
						import * as aero from '${aeroImportPath}'
						${javascriptInput.state.doc.toString()}
					</script>
				</body>
			</html>
		`;

		playgroundIframe.srcdoc = doc;
	};

	const playgroundIframe = document.querySelector(
		".playground-iframe"
	) as HTMLIFrameElement;

	const htmlInput = new EditorView({
		extensions: [
			basicSetup,
			html(),
			indentUnit.of("    "),
			EditorView.updateListener.of(updatePlayground),
		],
		parent: document.querySelector(".html-box")!,
	});

	const cssInput = new EditorView({
		extensions: [
			basicSetup,
			css(),
			indentUnit.of("    "),
			EditorView.updateListener.of(updatePlayground),
		],
		parent: document.querySelector(".css-box")!,
	});

	const javascriptInput = new EditorView({
		extensions: [
			basicSetup,
			javascript(),
			indentUnit.of("    "),
			EditorView.updateListener.of(updatePlayground),
		],
		parent: document.querySelector(".javascript-box")!,
	});

	const liElements = document.querySelectorAll(
		"aside nav li"
	) as NodeListOf<HTMLElement>;
	liElements.forEach((el) => {
		el.addEventListener("click", () => {
			htmlInput.dispatch({
				changes: {
					from: 0,
					to: htmlInput.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].html,
				},
			});

			cssInput.dispatch({
				changes: {
					from: 0,
					to: cssInput.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].css,
				},
			});

			javascriptInput.dispatch({
				changes: {
					from: 0,
					to: javascriptInput.state.doc.length,
					insert: widgets[el.dataset.key as keyof typeof widgets].js,
				},
			});
		});
	});

	htmlInput.dispatch({
		changes: {
			from: 0,
			to: htmlInput.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].html,
		},
	});
	cssInput.dispatch({
		changes: {
			from: 0,
			to: cssInput.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].css,
		},
	});
	javascriptInput.dispatch({
		changes: {
			from: 0,
			to: javascriptInput.state.doc.length,
			insert: widgets[liElements[0].dataset.key as keyof typeof widgets].js,
		},
	});
});

