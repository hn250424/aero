import { AppContext } from "@site/AppContext";
import { GettingStartedContext } from "./GettingStartedContext";

export function setupGettingStartedNavigation(appContext: AppContext) {
	appContext.$navGettingStarted?.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const gettingStartedCtx = appContext.switchCategory("getting_started", GettingStartedContext);
		const key = $target.dataset.key as string;
		gettingStartedCtx.switchPage(key);
	})
}
