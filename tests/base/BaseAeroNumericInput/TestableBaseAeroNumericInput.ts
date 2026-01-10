import { BaseAeroNumericInput } from "@src/base/BaseAeroNumericInput";
import aeroNumericInputHtmlTemplate from "@src/components/numeric_input/AeroNumericInput.html?raw";

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
