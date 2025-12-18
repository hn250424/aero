import "./docs_container.css";

import docsIntroductionHtml from "./introduction/docs_introduction.html?raw";
import docsApiHtml from "./api/docs_api.html?raw";
import docsPlaygroundHtml from "./playground/docs_playground.html?raw";

import initDocsIntroduction from "./introduction";
import initDocsApi from "./api";
import initDocsPlayground from "./playground";

import { selectComponent, getCurrentComponentKey } from "./store/component";
import type { ComponentKeys } from "./domain";

export default function initDocs() {
	const $liElements = document.querySelectorAll(
		".docs-container-aside nav li"
	) as NodeListOf<HTMLElement>;

	const $article = document.querySelector(".docs-container-article") as HTMLElement;
	$article.innerHTML = docsIntroductionHtml + docsApiHtml + docsPlaygroundHtml;

	initDocsIntroduction();
	initDocsApi();
	initDocsPlayground();

	$liElements.forEach(el => {
		el.addEventListener("click", () => {
			selectComponent(el.dataset.key as ComponentKeys);
		})
	})

	const currentComponentKey = getCurrentComponentKey() ?? 'aero-numeric-input';
	selectComponent(currentComponentKey, true);
}
