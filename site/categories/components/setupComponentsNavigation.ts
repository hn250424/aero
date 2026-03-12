import type { ComponentKeys } from "@site/domain";
import { AppContext } from "@site/AppContext";
import { navigateTo } from "@site/navigation";

export function setupComponentsNavigation(appContext: AppContext) {
	appContext.$navComponents?.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const key = $target.dataset.key as ComponentKeys;
		navigateTo(appContext, `/components/${key}`);
	});
}
