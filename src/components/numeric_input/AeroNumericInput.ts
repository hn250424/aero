import BaseAeroNumericInput from "../../base/BaseAeroNumericInput";
import aeroNumericInputHtmlTemplate from "./AeroNumericInput.html?raw";

export default class AeroNumericInput extends BaseAeroNumericInput {
	constructor() {
		super(aeroNumericInputHtmlTemplate);
	}

	protected getInputSelector(): string {
		return "#input";
	}
}

customElements.define("aero-numeric-input", AeroNumericInput);
