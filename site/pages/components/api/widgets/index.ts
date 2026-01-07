import type { ComponentKeys } from "@site/domain";

import AeroNumericInput from "./aero-numeric-input.html?raw";
import AeroSpinbox from "./aero-spinbox.html?raw";
import AeroProgressSpinner from "./aero-progress-spinner.html?raw";
import AeroResizableBox from "./aero-resizable-box.html?raw";

export const widgets: Record<ComponentKeys, string> = {
	"aero-numeric-input": AeroNumericInput,
	"aero-spinbox": AeroSpinbox,
	"aero-progress-spinner": AeroProgressSpinner,
	"aero-resizable-box": AeroResizableBox,
} as const;
