import { colors } from "./colors";

const html = `<aero-select id="as"></aero-select>`;

const css = `aero-select {
	--aero-select-height: 40px;
	--aero-select-button-background: ${colors.primary_3};
	--aero-select-button-border: 1px solid grey;
	--aero-select-button-hover-background: ${colors.primary_4};
	--aero-select-dropdown-hover-item-background: ${colors.primary_3};
}`;

const js = `const as = document.getElementById("as");
const op = document.createElement("aero-option");
op.value = "value-1";
op.textContent = "option-1";
as.appendChild(op);
as.optionIndex = 0;`;

export const aeroOption = {
	html: html,
	css: css,
	js: js,
};
