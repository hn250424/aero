import { EditorView, basicSetup } from "codemirror";
import { indentUnit } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

import {
	htmlBox,
	cssBox,
	javascriptBox,
	playgroundIframe
} from "../elements";

function createEditor(
	parent: HTMLElement,
	extensions: any[],
	onChange: () => void,
) {
	return new EditorView({
		extensions: [
			basicSetup,
			indentUnit.of("    "),
			...extensions,
			EditorView.updateListener.of(onChange)
		],
		parent: parent
	})
}

export function createPlaygroundEditors() {
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
					<style>${cssEditor.state.doc.toString()}</style>
				</head>
				<body>
					${htmlEditor.state.doc.toString()}
					<script type="module">
						import * as aero from '${aeroImportPath}'
						${javascriptEditor.state.doc.toString()}
					</script>
				</body>
			</html>
		`;

		playgroundIframe.srcdoc = doc;
	};

	const htmlEditor = createEditor(
		htmlBox,
		[html()],
		updatePlayground
	)

	const cssEditor = createEditor(
		cssBox,
		[css()],
		updatePlayground
	)

	const javascriptEditor = createEditor(
		javascriptBox,
		[javascript()],
		updatePlayground
	)

	return {
		htmlEditor,
		cssEditor,
		javascriptEditor
	}
}



