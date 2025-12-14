import "github-markdown-css/github-markdown.css";
import "./docs_api_reference.css";

import type { ComponentKeys } from "../domain/component";

import { marked } from "marked";

import { widgets } from "./widgets";
import { subscribeComponentChange } from "../store/component";

export default function initDocsApiReference() {
	const $apiReferenceContent = document.querySelector(".api-reference-content") as HTMLElement;

	subscribeComponentChange(key => {
		applyWidget(key, $apiReferenceContent)
	})
}

async function applyWidget(
	key: ComponentKeys,
	$apiReferenceContent: HTMLElement
) {
	const md = widgets[key];
	const html = await marked.parse(md);
	$apiReferenceContent.innerHTML = html;
}
