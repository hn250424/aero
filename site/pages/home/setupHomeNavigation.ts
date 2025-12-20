import { AppContext } from "@site/AppContext";
import { HomeContext } from "./HomeContext";

export function setupHomeNavigation(appContext: AppContext) {
	appContext.$logoImg.addEventListener("click", () => {
		const homeCtx = appContext.switchCategory("home", HomeContext);
	});
}
