import { AppContext } from "./AppContext";
import { setupNavigation } from "./navigation";

export function init() {
	const ctx = new AppContext();
	setupNavigation(ctx);
}
