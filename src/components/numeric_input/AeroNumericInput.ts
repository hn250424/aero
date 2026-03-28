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

	protected getInputSelector(): string {
		return "#input";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"aero-numeric-input": AeroNumericInput;
	}
}

customElements.define("aero-numeric-input", AeroNumericInput);
