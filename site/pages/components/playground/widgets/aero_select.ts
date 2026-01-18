const html = `<aero-select id="as" option-index="0">
	<aero-option value="value-1">option-1</aero-option>
	<aero-option value="value-2">option-2</aero-option>
</aero-select>`;

const css = `aero-select {
	--aero-select-height: 40px;
	--aero-select-button-background: #C5D89D;
	--aero-select-button-border: 1px solid grey;
	--aero-select-button-hover-background: #9CAB84;
	--aero-select-dropdown-hover-item-background: #C5D89D;
}`;

const js = `const as = document.getElementById("as");
as.addEventListener("aero-select-changed", (e) => {
	const option = e.detail.option;
	console.log(option.value);
	console.log(option.textContent);
	console.log(event.detail.index);
})`;

export const aeroSelect = {
	html: html,
	css: css,
	js: js,
};
