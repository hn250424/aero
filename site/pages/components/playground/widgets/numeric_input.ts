const html = `<aero-numeric-input
	id="ni", min="0.4" max="100" step="0.46" value="1">
</aero-numeric-input>`;

const css = `aero-numeric-input {
	text-align: center;
	margin-bottom: 5px;
}`;

const js = `const ni = document.getElementById("ni");
ni.addEventListener("input", () => {
	console.log(ni.input.value);
	console.log(ni.value);
})`;

export const aeroNumericInput = {
	html: html,
	css: css,
	js: js,
};
