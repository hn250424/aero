import { AppContext } from "./AppContext";

import { setupHomeNavigation } from "./pages/home";
import { setupDocsNavigation } from "./pages/docs";

export function setupNavigation(appContext: AppContext) {
	setupHomeNavigation(appContext);
	setupDocsNavigation(appContext);
}
