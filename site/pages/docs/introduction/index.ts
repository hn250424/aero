import "./docs_introduction.css";

import type { ComponentKeys } from "../domain/component";

import { subscribeComponentChange } from "../store/component";
import { widgets } from "./widgets";

export default function initIntroductionPlayground() {
	const $introductionContent = document.querySelector(".introduction-content") as HTMLElement;

	subscribeComponentChange((key) => {
		applyWidget(key, $introductionContent);
	});
}

function applyWidget(key: ComponentKeys, $introductionContent: HTMLElement) {
	$introductionContent.innerHTML = widgets[key];
}
