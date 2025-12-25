import type { ComponentKeys } from "@site/domain";

import { AppContext } from "@site/AppContext";
import { ComponentsContext } from "./ComponentsContext";

import { applyWidgetToIntroduction } from "./introduction";
import { applyWidgetToApi } from "./api";
import { applyWidgetToPlayground } from "./playground";

export function setupComponentsNavigation(appContext: AppContext) {
	appContext.$navComponents?.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const componentsCtx = appContext.switchCategory("components", ComponentsContext);
		const key = $target.dataset.key as ComponentKeys;

		applyWidgetToIntroduction(componentsCtx.$introductionContent, key);
		applyWidgetToApi(componentsCtx.$apiContent, key);
		applyWidgetToPlayground(componentsCtx.editors, key);
	});
}
