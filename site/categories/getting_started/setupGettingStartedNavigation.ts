import { AppContext } from "@site/AppContext";
import { navigateTo } from "@site/navigation";

export function setupGettingStartedNavigation(appContext: AppContext) {
	appContext.$navGettingStarted.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const key = $target.dataset.key as string;
		navigateTo(appContext, `/getting_started/${key}`);
	})
}
