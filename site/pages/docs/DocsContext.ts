import type { Context } from "../Context";
import type { PlaygroundEditors } from "./playground";

import { createPlaygroundEditors } from "./playground";

import docsIntroductionHtml from "./introduction/docs_introduction.html?raw";
import docsApiHtml from "./api/docs_api.html?raw";
import docsPlaygroundHtml from "./playground/docs_playground.html?raw";

export class DocsContext implements Context {
	readonly $introductionContent: HTMLElement;
	readonly $apiContent: HTMLElement;
	readonly $htmlBox: HTMLElement;
	readonly $cssBox: HTMLElement;
	readonly $javascriptBox: HTMLElement;
	readonly $playgroundIframe: HTMLIFrameElement;
	readonly editors: PlaygroundEditors;

	constructor($main: HTMLElement) {
		$main.innerHTML = docsIntroductionHtml + docsApiHtml + docsPlaygroundHtml;

		this.$introductionContent = document.querySelector(".introduction-content")!;
		this.$apiContent = document.querySelector(".api-content")!;
		this.$htmlBox = document.querySelector(".html-box")!;
		this.$cssBox = document.querySelector(".css-box")!;
		this.$javascriptBox = document.querySelector(".javascript-box")!;
		this.$playgroundIframe = document.querySelector(".playground-iframe")!;

		this.editors = createPlaygroundEditors(
			this.$htmlBox,
			this.$cssBox,
			this.$javascriptBox,
			this.$playgroundIframe
		);
	}

	clean() {
		this.editors!.dispose();
	}
}
