export { AeroNumericInput } from "./components/numeric_input/AeroNumericInput";
export { AeroSpinbox } from "./components/spinbox/AeroSpinbox";
export { AeroProgressSpinner } from "./components/progress_spinner/AeroProgressSpinner";
export { AeroResizeBox } from "./components/resize_box/AeroResizeBox";
export { AeroSelect } from "./components/select/AeroSelect";
export { AeroOption } from "./components/select/AeroOption";

import type { AeroNumericInput } from "./components/numeric_input/AeroNumericInput";
import type { AeroSpinbox } from "./components/spinbox/AeroSpinbox";
import type { AeroProgressSpinner } from "./components/progress_spinner/AeroProgressSpinner";
import type { AeroResizeBox } from "./components/resize_box/AeroResizeBox";
import type { AeroSelect } from "./components/select/AeroSelect";
import type { AeroOption } from "./components/select/AeroOption";

declare global {
	interface HTMLElementTagNameMap {
		"aero-numeric-input": AeroNumericInput;
		"aero-spinbox": AeroSpinbox;
		"aero-progress-spinner": AeroProgressSpinner;
		"aero-resize-box": AeroResizeBox;
		"aero-select": AeroSelect;
		"aero-option": AeroOption;
	}
}
