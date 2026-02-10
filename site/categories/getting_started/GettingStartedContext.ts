import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism.css";
import "./getting_started.css";

import type { PageableContext } from "../Context";

import gettingStartedContainerHtml from "./getting_started.html?raw";
import gettingStartedInstallationHtml from "./installation/getting_started_installation.html?raw";
import gettingStartedUsageHtml from "./usage/getting_started_usage.html?raw";

const _gettingStartedMap: Record<string, string> = {
	installation: gettingStartedInstallationHtml,
	usage: gettingStartedUsageHtml,
};

export class GettingStartedContext implements PageableContext {
	$gettingStartedContainer: HTMLElement;

	constructor($main: HTMLElement) {
		$main.innerHTML = gettingStartedContainerHtml;

		this.$gettingStartedContainer = document.querySelector(
			".getting-started-container"
		)!;
	}

	switchPage(key: string) {
		this.$gettingStartedContainer.innerHTML = _gettingStartedMap[key];

		document.querySelectorAll("pre code").forEach((block) => {
			const lines = block.textContent.split("\n");
			const minIndent = lines
				.filter((line) => line.trim().length > 0)
				.reduce((min, line) => {
					const indent = line.match(/^\s*/)?.[0].length ?? 0;
					return Math.min(min, indent);
				}, Infinity);

			const cleaned = lines
				.map((line) => line.slice(minIndent))
				.join("\n")
				.trim();

			block.textContent = cleaned;
		});

		Prism.highlightAllUnder(this.$gettingStartedContainer);
	}

	clean(): void {}
}
