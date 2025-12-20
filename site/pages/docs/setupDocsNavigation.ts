import type { ComponentKeys } from "@site/domain";

import { AppContext } from "@site/AppContext";
import { DocsContext } from "./DocsContext";

import { applyWidgetToIntroduction } from "./introduction";
import { applyWidgetToApi } from "./api";
import { applyWidgetToPlayground } from "./playground";

export function setupDocsNavigation(appContext: AppContext) {
	appContext.$navComponents?.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key"
		) as HTMLElement;
		if (!$target) return;

		const docsCtx = appContext.switchCategory("docs", DocsContext);
		const key = $target.dataset.key as ComponentKeys;

		applyWidgetToIntroduction(docsCtx.$introductionContent, key);
		applyWidgetToApi(docsCtx.$apiContent, key);
		applyWidgetToPlayground(docsCtx.editors, key);
	});
}
