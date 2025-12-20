import type { Context } from "../Context";
import homeHtml from "./home.html?raw";

export class HomeContext implements Context {

	constructor($main: HTMLElement) {
		$main.innerHTML = homeHtml;
	}

	clean(): void {}


}
