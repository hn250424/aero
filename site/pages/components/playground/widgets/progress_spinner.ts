import { colors } from "./colors";

const html = `<aero-progress-spinner id="spinner" width="50" height="50"
	cycle="1.5" background="white" color="${colors.primary_4}">
</aero-progress-spinner>

<button id="spin">spin</button>
<button id="stop">stop</button>`;

const css = `button {
	width: 100px;
	height: 50px;
	background: ${colors.primary_4};
	border: 1px solid ${colors.primary_2};
	color: white;
}

button:hover {
	cursor: pointer;
	filter: brightness(0.9);
}

aero-progress-spinner {
	margin-bottom: 20px;
}

aero-progress-spinner:hover {
	cursor: pointer;
}`;

const js = `const spinner = document.querySelector("#spinner");
const spinBtn = document.querySelector("#spin");
const stopBtn = document.querySelector("#stop");

spinBtn.addEventListener("click", () => {
	spinner.spin();
})

stopBtn.addEventListener("click", () => {
	spinner.stop();
})`;

export const aeroProgressSpinner = {
	html: html,
	css: css,
	js: js,
};
