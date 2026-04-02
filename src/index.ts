import { AeroNumericInput } from "./components/numeric_input/AeroNumericInput";
import { AeroSpinbox } from "./components/spinbox/AeroSpinbox";
import { AeroIndeterminateSpinner } from "./components/indeterminate_spinner/AeroIndeterminateSpinner";
import { AeroResizableBox, type AeroResizableBoxEvents } from "./components/resizable_box/AeroResizableBox";
import { AeroSelect, type AeroSelectEvents } from "./components/select/AeroSelect";
import { AeroOption } from "./components/select/AeroOption";
import { AeroToast, type AeroToastOptions } from "./components/toast/AeroToast";
import { AeroPopup, type AeroPopupOptions } from "./components/popup/AeroPopup";
import { AeroRoller, type AeroRollerEvents } from "./components/roller/AeroRoller";

// Registration
customElements.define("aero-numeric-input", AeroNumericInput);
customElements.define("aero-spinbox", AeroSpinbox);
customElements.define("aero-indeterminate-spinner", AeroIndeterminateSpinner);
customElements.define("aero-resizable-box", AeroResizableBox);
customElements.define("aero-select", AeroSelect);
customElements.define("aero-option", AeroOption);
customElements.define("aero-toast", AeroToast);
customElements.define("aero-popup", AeroPopup);
customElements.define("aero-roller", AeroRoller);

// Global Types
declare global {
	interface HTMLElementTagNameMap {
		"aero-numeric-input": AeroNumericInput;
		"aero-spinbox": AeroSpinbox;
		"aero-indeterminate-spinner": AeroIndeterminateSpinner;
		"aero-resizable-box": AeroResizableBox;
		"aero-select": AeroSelect;
		"aero-option": AeroOption;
		"aero-toast": AeroToast;
		"aero-popup": AeroPopup;
		"aero-roller": AeroRoller;
	}
}

// Exports
export {
	AeroNumericInput,
	AeroSpinbox,
	AeroIndeterminateSpinner,
	AeroResizableBox,
	AeroSelect,
	AeroOption,
	AeroToast,
	AeroPopup,
	AeroRoller,
};

export type {
	AeroResizableBoxEvents,
	AeroSelectEvents,
	AeroToastOptions,
	AeroPopupOptions,
	AeroRollerEvents,
};
