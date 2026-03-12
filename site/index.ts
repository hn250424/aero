import "./styles/index.css";
import { init } from "./app";

// Redirect restoration
(function restorePath() {
	const params = new URLSearchParams(window.location.search);
	const path = params.get("path");
	if (path) {
		window.history.replaceState(null, "", path);
	}
})();

document.addEventListener("DOMContentLoaded", init);

