import type { ComponentKeys } from "@site/domain";
import { AppContext } from "@site/AppContext";

export function setupComponentsNavigation(appContext: AppContext) {
	appContext.$navComponents?.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const componentsCtx = appContext.switchCategory("components");
		const key = $target.dataset.key as ComponentKeys;
		componentsCtx.switchPage(key);
	});
}
