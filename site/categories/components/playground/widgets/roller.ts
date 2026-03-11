import { colors } from "./colors";

const html = `<aero-roller></aero-roller>`;

const css = `aero-roller {
	--aero-roller-highlight-border-top: 1px solid ${colors.primary_5};
	--aero-roller-highlight-border-bottom: 1px solid ${colors.primary_5};
	--aero-roller-highlight-bg: rgba(197, 216, 157, 0.35);
	--aero-roller-item-cursor: pointer;

	width: 200px;

	background-color: #F9F9F7;
  border: 1px solid #E0E0D5;
  border-radius: 16px;

	box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}`;

const js = `const arr = ["apple", "banana", "cherry", "mango", "grape", "pear", "peach"]

const roller = document.querySelector('aero-roller')
roller.setItems(arr)

roller.addEventListener("change", () => {
	console.log(roller.index)
})`;

export const aeroRoller = {
	html: html,
	css: css,
	js: js,
};
