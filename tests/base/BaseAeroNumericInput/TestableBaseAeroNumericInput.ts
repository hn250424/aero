import { BaseAeroNumericInput } from "@base/BaseAeroNumericInput";
import aeroNumericInputHtmlTemplate from "@components/numeric_input/AeroNumericInput.html?raw";

export class TestableBaseAeroNumericInput extends BaseAeroNumericInput {
	protected getInputSelector(): string {
		return "#input";
	}

	public constructor() {
		super(aeroNumericInputHtmlTemplate);
	}
}

if (!customElements.get("testable-base-numeric-input")) {
  customElements.define("testable-base-numeric-input", TestableBaseAeroNumericInput);
}
