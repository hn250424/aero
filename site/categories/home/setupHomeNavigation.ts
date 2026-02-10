import { AppContext } from "@site/AppContext";

export function setupHomeNavigation(appContext: AppContext) {
	appContext.$logoImg.addEventListener("click", () => {
		appContext.switchCategory("home");
	});
}
