import { AppContext } from "@site/AppContext";

export function setupLinksNavigation(appContext: AppContext) {
	appContext.$navLinks.addEventListener("click", (e) => {
		const $target = (e.target as HTMLElement).closest(
			"li[data-key]"
		) as HTMLElement;
		if (!$target) return;

		const key = $target.dataset.key as string;
		_linkHandlers[key as keyof typeof _linkHandlers]();
	});
}

const _linkHandlers = {
	github: _linkGithub,
	npm: _linkNpm,
}

function _linkGithub() {
	window.open(
		"https://github.com/hn250424/aero",
		"_blank",
		"noopener,noreferrer"
	);
}

function _linkNpm() {
	window.open(
		"https://www.npmjs.com/package/@hn250424/aero",
		"_blank",
		"noopener,noreferrer"
	);
}
