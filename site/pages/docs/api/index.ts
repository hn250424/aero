import "github-markdown-css/github-markdown.css";
import "./docs_api.css";

import type { ComponentKeys } from "@site/domain/component";

import { widgets } from "./widgets";

export function applyWidgetToApi($dom: HTMLElement, key: ComponentKeys) {
	$dom.innerHTML = widgets[key];
}
