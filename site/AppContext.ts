import type { ContextNavCategory } from "./domain";
import type { Context } from "./categories/Context";
import { HomeContext } from "./categories/home/HomeContext";
import { GettingStartedContext } from "./categories/getting_started/GettingStartedContext";
import { ComponentsContext } from "./categories/components/ComponentsContext";

const categoryContextMap = {
	home: HomeContext,
	getting_started: GettingStartedContext,
	components: ComponentsContext,
} satisfies Record<ContextNavCategory, new ($main: HTMLElement) => Context>;

export class AppContext {
	$main: HTMLElement;
	$logoImg: HTMLElement;

	$navGettingStarted: HTMLElement;
	$navComponents: HTMLElement;
	$navLinks: HTMLElement;

	private _currentCategory: ContextNavCategory;
	private _activeContext: Context;

	constructor() {
		this.$main = document.querySelector("main") as HTMLElement;
		this.$logoImg = document.querySelector("#logo") as HTMLElement;

		this.$navGettingStarted = document.querySelector(
			".nav-getting-started"
		) as HTMLElement;
		this.$navComponents = document.querySelector(
			".nav-components"
		) as HTMLElement;
		this.$navLinks = document.querySelector(".nav-links") as HTMLElement;

		// Init.
		this._currentCategory = "home";
		this._activeContext = new HomeContext(this.$main);
	}

	// Returns the active context, which could be a simple Context or a Context that extends it
	switchCategory<K extends ContextNavCategory>(
		category: K
	): InstanceType<(typeof categoryContextMap)[K]> {
		if (this._currentCategory === category) {
			return this._activeContext as InstanceType<
				(typeof categoryContextMap)[K]
			>;
		}
		this._currentCategory = category;

		this._activeContext?.clean();
		const ctor = categoryContextMap[category];
		this._activeContext = new ctor(this.$main);

		return this._activeContext as InstanceType<(typeof categoryContextMap)[K]>;
	}

	getActiveContext() {
		return this._activeContext as Context;
	}
}
