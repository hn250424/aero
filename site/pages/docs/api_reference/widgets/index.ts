import type { ComponentKeys } from "../../domain";

import AeroNumericInput from "./aero-numeric-input.md?raw";
import AeroSpinbox from "./aero-spinbox.md?raw";
import AeroProgressSpinner from "./aero-progress-spinner.md?raw";
import AeroResizeBox from "./aero-resize-box.md?raw";

export const widgets: Record<ComponentKeys, any> = {
	"aero-numeric-input": AeroNumericInput,
	"aero-spinbox": AeroSpinbox,
	"aero-progress-spinner": AeroProgressSpinner,
	"aero-resize-box": AeroResizeBox,
} as const;
