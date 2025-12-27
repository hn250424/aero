import type { NavCategory } from "./domain";
import type { Context } from "./pages/Context";

export class AppContext {
	$main: HTMLElement;
	$logoImg: HTMLElement;

	$navGettingStarted: HTMLElement;
	$navComponents: HTMLElement;
	$navLinks: HTMLElement;

	private _currentCategory: NavCategory | null = null;
	private _activeContext: Context | null = null;

	constructor() {
		this.$main = document.querySelector("main") as HTMLElement;
		this.$logoImg = document.querySelector("#logo") as HTMLElement;

		this.$navGettingStarted = document.querySelector(".nav-getting-started") as HTMLElement;
		this.$navComponents = document.querySelector(".nav-components") as HTMLElement;
		this.$navLinks = document.querySelector(".nav-links") as HTMLElement;
	}

	switchCategory<T extends Context>(
		category: NavCategory,
		ContextClass: new ($main: HTMLElement) => T
	): T {
		if (this._currentCategory === category && this._activeContext) {
			return this._activeContext as T;
		}

		this._currentCategory = category;

		this._activeContext?.clean();
		this._activeContext = new ContextClass(this.$main);

		return this._activeContext as T;
	}

	getActiveContext<T extends Context>(): T {
		return this._activeContext as T;
	}
}
