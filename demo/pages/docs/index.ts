// import docsIntroductionHtml from "./playground/docs_introduction.html?raw";
// import docsApiReferenceHtml from "./playground/docs_api_reference.html?raw";
import docsPlaygroundHtml from "./playground/docs_playground.html?raw";

// import initDocsIntroduction from "./introduction";
// import initDocsApiReference from "./api_reference";
import initDocsPlayground from "./playground";

export default function initDocs() {
	const $section = document.querySelector(".docs-container-section") as HTMLElement;

	// $section.innerHTML = docsIntroductionHtml;
	// $section.innerHTML = docsApiReferenceHtml;
	$section.innerHTML = docsPlaygroundHtml;

	// initDocsIntroduction();
	// initDocsApiReference();
	initDocsPlayground();
}
