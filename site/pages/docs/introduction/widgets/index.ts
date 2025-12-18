import type { ComponentKeys } from "../../domain";

import {sAeroNumericInput} from "./numeric_input";
import {sAeroSpinbox} from "./spinbox";
import {sAeroProgressSpinner} from "./progress_spinner";
import {sAeroResizeBox} from "./resize_box";

export const widgets: Record<ComponentKeys, string> = {
	"aero-numeric-input": sAeroNumericInput,
	"aero-spinbox": sAeroSpinbox,
	"aero-progress-spinner": sAeroProgressSpinner,
	"aero-resize-box": sAeroResizeBox,
} as const;
