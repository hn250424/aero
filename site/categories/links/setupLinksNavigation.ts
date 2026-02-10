import { AppContext } from "@site/AppContext";

export function setupLinksNavigation(appContext: AppContext) {
	appContext.$navLinks.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const key = $target.dataset.key as string;

		_openMap[key as keyof typeof _openMap]();
	});
}

const _openMap = {
	github: _openGithub,
}

function _openGithub() {
	window.open(
		"https://github.com/hn250424/aero",
		"_blank",
		"noopener,noreferrer"
	);
}
