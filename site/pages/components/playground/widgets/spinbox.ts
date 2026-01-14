const html = `<aero-spinbox id="sb" min="0.4" max="100" step="0.46" value="1"
	minus-text="-" plus-text="+" button-backgroundcolor="#C5D89D">
</aero-spinbox>`;

const css = `aero-spinbox {
	border: 1px solid #9CAB84;
	margin-bottom: 5px;
}`;

const js = `const sb = document.getElementById("sb");
sb.addEventListener("input", () => {
	console.log(sb.input.value);
	console.log(sb.value);
})`;

export const aeroSpinbox = {
	html: html,
	css: css,
	js: js,
};
