import "./docs_container.css";

import docsIntroductionHtml from "./introduction/docs_introduction.html?raw";
import docsApiReferenceHtml from "./api_reference/docs_api_reference.html?raw";
import docsPlaygroundHtml from "./playground/docs_playground.html?raw";

import initDocsIntroduction from "./introduction";
import initDocsApiReference from "./api_reference";
import initDocsPlayground from "./playground";

import { selectComponent, getCurrentComponentKey } from "./store/component";
import type { ComponentKeys } from "./domain";

export default function initDocs() {
	const $liElements = document.querySelectorAll(
		".docs-container-aside nav li"
	) as NodeListOf<HTMLElement>;

	const $article = document.querySelector(".docs-container-article") as HTMLElement;
	$article.innerHTML = docsIntroductionHtml + docsApiReferenceHtml + docsPlaygroundHtml;

	initDocsIntroduction();
	initDocsApiReference();
	initDocsPlayground();

	$liElements.forEach(el => {
		el.addEventListener("click", () => {
			selectComponent(el.dataset.key as ComponentKeys);
		})
	})

	const currentComponentKey = getCurrentComponentKey() ?? 'aero-numeric-input';
	selectComponent(currentComponentKey, true);
}
