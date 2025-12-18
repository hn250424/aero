import { BaseAeroNumericInput } from "../../base/BaseAeroNumericInput";
import aeroNumericInputHtmlTemplate from "./AeroNumericInput.html?raw";

/**
 * @module components
 */

/**
 * A numeric input web component.
 *
 * @extends BaseAeroNumericInput
 */
export class AeroNumericInput extends BaseAeroNumericInput {
	constructor() {
		super(aeroNumericInputHtmlTemplate);
	}

	/**
	 * Returns the CSS selector for the internal input element.
	 * @returns {string} The CSS selector.
	 * @protected
	 */
	protected getInputSelector(): string {
		return "#input";
	}
}

customElements.define("aero-numeric-input", AeroNumericInput);
