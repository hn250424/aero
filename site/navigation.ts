import { AppContext } from "./AppContext";
import type { ComponentKeys } from "@site/domain";

import { setupHomeNavigation } from "./categories/home";
import { setupGettingStartedNavigation } from "./categories/getting_started";
import { setupComponentsNavigation } from "./categories/components";
import { setupLinksNavigation } from "./categories/links";

/**
 * Navigates to a specific path using history.pushState
 */
export function navigateTo(appContext: AppContext, path: string) {
	window.history.pushState(null, "", path);
	handleRoute(appContext);
}

export function setupNavigation(appContext: AppContext) {
	setupHomeNavigation(appContext);
	setupGettingStartedNavigation(appContext);
	setupComponentsNavigation(appContext);
	setupLinksNavigation(appContext);

	window.addEventListener("popstate", () => handleRoute(appContext));
	
	// Handle initial route
	handleRoute(appContext);
}

function handleRoute(appContext: AppContext) {
	const pathname = window.location.pathname;
	
	// Assuming base path is / or /aero/
	const normalizedPath = pathname.replace(/^\/aero/, "") || "/";

	if (normalizedPath === "/" || normalizedPath === "") {
		appContext.switchCategory("home");
		return;
	}

	// 1. ^/          : match the start of the string with '/'
	// 2. ([^/]+)     : capture all characters except '/' as the 'category'
	// 3. (?:/(.+))?$ : optionally capture any remaining characters after a '/' as the 'pageKey'
	// => matches[1] = "getting_started", matches[2] = "installation"
	const matches = normalizedPath.match(/^\/([^\/]+)(?:\/(.+))?$/);
	if (!matches) {
		appContext.switchCategory("home");
		return;
	}

	const category = matches[1];
	const pageKey = matches[2];

	if (category === "getting_started") {
		const ctx = appContext.switchCategory("getting_started");
		if (pageKey) {
			ctx.switchPage(pageKey);
		}
	} else if (category === "components") {
		const ctx = appContext.switchCategory("components");
		if (pageKey) {
			ctx.switchPage(pageKey as ComponentKeys);
		}
	} else {
		appContext.switchCategory("home");
	}
}
