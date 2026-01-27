import { colors } from "./colors";
import { AERO_IMPORT_PATH } from "@site/constants/path";

const html = `<button id="btn">Show</button>`;

const css = `button {
	width: 150px;
	height: 50px;
	background: ${colors.primary_4};
	border: 1px solid ${colors.primary_2};
	color: #fff;
}

button:hover {
	filter: brightness(0.9);
	cursor: pointer;
}

button:active {
	filter: brightness(1.1);
	transform: scale(0.98);
}
`;

const js = `import { AeroToast } from '${AERO_IMPORT_PATH}';

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
	AeroToast.show("Hello Aero!", { top: 30 });
})
`;

export const aeroToast = {
	html: html,
	css: css,
	js: js,
};
