const html = `<aero-progress-spinner id="spinner" width="50" height="50"
	cycle="1.5" background="white" color="#9CAB84">
</aero-progress-spinner>`;

const css = `aero-progress-spinner {

}`;

const js = `const spinner = document.querySelector("#spinner");
spinner.addEventListener("click", () => {
	spinner.spin();

	setTimeout(() => {
		spinner.stop();
	}, 2000);
})`;

export const aeroProgressSpinner = {
	html: html,
	css: css,
	js: js,
};
