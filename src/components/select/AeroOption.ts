export class AeroOption extends HTMLElement {
	constructor() {
		super()
	}

	get value(): string {
		return this.getAttribute("value") ?? "";
	}

	set value(v: string) {
		this.setAttribute("value", v);
	}

	get label(): string {
		return this.textContent ?? "";
	}
}

customElements.define("aero-option", AeroOption);
