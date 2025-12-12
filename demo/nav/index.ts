import docsContainerHtml from "@demo/pages/docs/docs_container.html?raw";
import aboutContainerHtml from "@demo/pages/about/about_container.html?raw";

import initDocs from "@demo/pages/docs";

export default function navigate() {
	const $main = document.querySelector("main") as HTMLElement;
	const $navDocs = document.querySelector(".nav-docs") as HTMLElement;
	const $navAbout = document.querySelector(".nav-about") as HTMLElement;

	$navDocs.addEventListener("click", async () => {
		$main.innerHTML = docsContainerHtml;
		initDocs();
	});

	$navAbout.addEventListener("click", async () => {
		$main.innerHTML = aboutContainerHtml;

	});
}
