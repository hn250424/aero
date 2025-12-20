const html = `<aero-spinbox min="0.4" max="100" step="0.46" value="1"
	minus-text="-" plus-text="+" button-backgroundcolor="#ccc">
</aero-spinbox>`;

const css = `aero-spinbox {
	margin-bottom: 5px;
}`;

const js = `const spinbox = new aero.AeroSpinbox()
spinbox.setAttribute('button-backgroundcolor', '#ccc')
spinbox.value = 1
spinbox.step = 0.46
document.body.appendChild(spinbox)`;

export const aeroSpinbox = {
	html: html,
	css: css,
	js: js,
};
