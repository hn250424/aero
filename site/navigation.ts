import { AppContext } from "./AppContext";

import { setupHomeNavigation } from "./pages/home";
import { setupComponentsNavigation } from "./pages/components";

export function setupNavigation(appContext: AppContext) {
	setupHomeNavigation(appContext);
	setupComponentsNavigation(appContext);
}
