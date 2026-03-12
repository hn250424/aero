import { AppContext } from "@site/AppContext";
import { navigateTo } from "@site/navigation";

export function setupHomeNavigation(appContext: AppContext) {
	appContext.$logoImg.addEventListener("click", () => {
		navigateTo(appContext, "/");
	});
}
