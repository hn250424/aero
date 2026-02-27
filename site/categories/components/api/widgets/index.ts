import type { ComponentKeys } from "@site/domain";

import AeroNumericInput from "./aero-numeric-input.html?raw";
import AeroSpinbox from "./aero-spinbox.html?raw";
import AeroProgressSpinner from "./aero-progress-spinner.html?raw";
import AeroProgressIndeterminateSpinner from "./aero-progress-indeterminate-spinner.html?raw";
import AeroResizableBox from "./aero-resizable-box.html?raw";
import AeroSelect from "./aero-select.html?raw";
import AeroOption from "./aero-option.html?raw";
import AeroToast from "./aero-toast.html?raw";
import AeroPopup from "./aero-popup.html?raw";

export const widgets: Record<ComponentKeys, string> = {
	"aero-numeric-input": AeroNumericInput,
	"aero-spinbox": AeroSpinbox,
	"aero-progress-spinner": AeroProgressSpinner,
	"aero-progress-indeterminate-spinner": AeroProgressIndeterminateSpinner,
	"aero-resizable-box": AeroResizableBox,
	"aero-select": AeroSelect,
	"aero-option": AeroOption,
	"aero-toast": AeroToast,
	"aero-popup": AeroPopup,
} as const;
