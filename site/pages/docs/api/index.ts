import "github-markdown-css/github-markdown.css";
import "./docs_api.css";

import type { ComponentKeys } from "../domain/component";

import { widgets } from "./widgets";
import { subscribeComponentChange } from "../store/component";

export default function initDocsApi() {
	const $apiContent = document.querySelector(".api-content") as HTMLElement;

	subscribeComponentChange(key => {
		applyWidget(key, $apiContent)
	})
}

async function applyWidget(
	key: ComponentKeys,
	$apiContent: HTMLElement
) {
	$apiContent.innerHTML = widgets[key];
}
