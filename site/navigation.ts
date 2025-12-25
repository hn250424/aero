import { AppContext } from "./AppContext";

import { setupHomeNavigation } from "./pages/home";
import { setupComponentsNavigation } from "./pages/components";
import { setupLinksNavigation } from "./pages/links";

export function setupNavigation(appContext: AppContext) {
	setupHomeNavigation(appContext);
	setupComponentsNavigation(appContext);
	setupLinksNavigation(appContext);
}
