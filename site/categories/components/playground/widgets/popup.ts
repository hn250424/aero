import { colors } from "./colors";
import { AERO_IMPORT_PATH } from "@site/constants/path";

const html = `<button id="btn">Confirm</button>`;

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

const js = `import { AeroPopup } from '${AERO_IMPORT_PATH}';
let count = 0
setInterval(() => {
	console.log(count++)
}, 1000);

const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
	const options = {
		primaryBackgroundColor: "${colors.primary_4}"
	}
	const answer = await AeroPopup.confirm("Good?", options);
	if (answer) console.log("Ok");
	else console.log("Cancel");
})
`;

export const aeroPopup = {
	html: html,
	css: css,
	js: js,
};
