/**
 * @module components
 */

/**
 * `<aero-option>` is a custom element used within `<aero-select>` to represent a selectable option.
 *
 * @element aero-option
 *
 * @slot - Default slot for the option's visible text content.
 *
 * @extends HTMLElement
 */
export class AeroOption extends HTMLElement {
	constructor() {
		super()
	}

	/**
	 * The value associated with this option, similar to the `value` attribute on a standard `<option>`.
	 * @type {string}
	 * @attr value
	 */
	get value(): string {
		return this.getAttribute("value") ?? "";
	}

	set value(v: string) {
		this.setAttribute("value", v);
	}

	/**
	 * The visible text label of the option. This is typically the text content of the element.
	 * @type {string}
	 */
	get label(): string {
		return this.textContent ?? "";
	}
}

customElements.define("aero-option", AeroOption);
