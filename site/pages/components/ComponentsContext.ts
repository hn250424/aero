import "./components.css";

import type { Context } from "../Context";
import type { PlaygroundEditors } from "./playground";

import { createPlaygroundEditors } from "./playground";

import componentsIntroductionHtml from "./introduction/components_introduction.html?raw";
import componentsApiHtml from "./api/components_api.html?raw";
import componentsPlaygroundHtml from "./playground/components_playground.html?raw";

export class ComponentsContext implements Context {
	readonly $introductionContent: HTMLElement;
	readonly $apiContent: HTMLElement;
	readonly $htmlBox: HTMLElement;
	readonly $cssBox: HTMLElement;
	readonly $javascriptBox: HTMLElement;
	readonly $playgroundIframe: HTMLIFrameElement;
	readonly editors: PlaygroundEditors;

	constructor($main: HTMLElement) {
		$main.innerHTML =
			`<div class="components_container">${componentsIntroductionHtml + componentsApiHtml + componentsPlaygroundHtml}</div>`;

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
