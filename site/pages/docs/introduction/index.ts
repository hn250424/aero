import "./docs_introduction.css";

import type { ComponentKeys } from "@site/domain/component";

import { widgets } from "./widgets";

export function applyWidgetToIntroduction($dom: HTMLElement, key: ComponentKeys) {
	$dom.innerHTML = widgets[key];
}
