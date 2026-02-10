import { AppContext } from "./AppContext";

import { setupHomeNavigation } from "./categories/home";
import { setupGettingStartedNavigation } from "./categories/getting_started";
import { setupComponentsNavigation } from "./categories/components";
import { setupLinksNavigation } from "./categories/links";

export function setupNavigation(appContext: AppContext) {
	setupHomeNavigation(appContext);
	setupGettingStartedNavigation(appContext);
	setupComponentsNavigation(appContext);
	setupLinksNavigation(appContext);
}
