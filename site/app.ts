import { AppContext } from "./AppContext";
import { setupNavigation } from "./navigation";
import { HomeContext } from "./pages/home/HomeContext";

export function init() {
	const ctx = new AppContext();
	setupNavigation(ctx);
	ctx.switchCategory("home", HomeContext);
}
