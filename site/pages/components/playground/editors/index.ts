// import "@hn250424/aero";
import { AERO_IMPORT_PATH } from "@site/constants/path";

import type { Extension } from "@codemirror/state";
import type { PlaygroundEditors } from "../domain";

import { EditorView, basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

/**
 * Creates HTML/CSS/JS editors inside the provided box elements.
 * Each editor is bound to the given iframe and re-renders it whenever its content changes.
 */
export function createPlaygroundEditors(
	$htmlBox: HTMLElement,
	$cssBox: HTMLElement,
	$javascriptBox: HTMLElement,
	$playgroundIframe: HTMLIFrameElement
): PlaygroundEditors {
		const updatePlayground = () => {
		const doc = `
			<html>
				<head>
					<style>${cssEditor.state.doc.toString()}</style>
				</head>
				<body>
					${htmlEditor.state.doc.toString()}
					<script type="module">
						import '${AERO_IMPORT_PATH}'
						${javascriptEditor.state.doc.toString()}
					</script>
				</body>
			</html>
		`;

		$playgroundIframe.srcdoc = doc;
	};
	// const updatePlayground = () => {
	// 	const doc = `
	// 		<html>
	// 			<head>
	// 				<style>${cssEditor.state.doc.toString()}</style>
	// 			</head>
	// 			<body>
	// 				${htmlEditor.state.doc.toString()}
	// 				<script src="https://unpkg.com/@hn250424/aero/umd"></script>
	// 				<script type="module">${javascriptEditor.state.doc.toString()}</script>
	// 			</body>
	// 		</html>
	// 	`;

	// 	$playgroundIframe.srcdoc = doc;
	// };

	const htmlEditor = createEditor($htmlBox, [html()], updatePlayground);
	const cssEditor = createEditor($cssBox, [css()], updatePlayground);
	const javascriptEditor = createEditor(
		$javascriptBox,
		[javascript()],
		updatePlayground
	);

	return {
		htmlEditor,
		cssEditor,
		javascriptEditor,
		dispose() {
			htmlEditor.destroy();
			cssEditor.destroy();
			javascriptEditor.destroy();
		}
	};
}

function createEditor(
	parent: HTMLElement,
	extensions: Extension[],
	onChange: () => void
) {
	return new EditorView({
		extensions: [
			basicSetup,
			indentUnit.of("    "),
			...extensions,
			EditorView.updateListener.of(onChange),
		],
		parent: parent,
	});
}
