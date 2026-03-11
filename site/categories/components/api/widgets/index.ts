import type { ComponentKeys } from "@site/domain";

import AeroNumericInput from "./aero-numeric-input.html?raw";
import AeroSpinbox from "./aero-spinbox.html?raw";
import AeroIndeterminateSpinner from "./aero-indeterminate-spinner.html?raw";
import AeroResizableBox from "./aero-resizable-box.html?raw";
import AeroSelect from "./aero-select.html?raw";
import AeroOption from "./aero-option.html?raw";
import AeroToast from "./aero-toast.html?raw";
import AeroPopup from "./aero-popup.html?raw";
import AeroRoller from "./aero-roller.html?raw";

export const widgets: Record<ComponentKeys, string> = {
	"aero-numeric-input": AeroNumericInput,
	"aero-spinbox": AeroSpinbox,
	"aero-indeterminate-spinner": AeroIndeterminateSpinner,
	"aero-resizable-box": AeroResizableBox,
	"aero-select": AeroSelect,
	"aero-option": AeroOption,
	"aero-toast": AeroToast,
	"aero-popup": AeroPopup,
	"aero-roller": AeroRoller,
} as const;
