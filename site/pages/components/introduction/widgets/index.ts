import type { ComponentKeys } from "@site/domain";

import { aeroNumericInputIntroduction } from "./numeric_input";
import { aeroSpinboxIntroduction } from "./spinbox";
import { aeroProgressSpinnerIntroduction } from "./progress_spinner";
import { aeroResizableBoxIntroduction } from "./resizable_box";

export const widgets: Record<ComponentKeys, string> = {
	"aero-numeric-input": aeroNumericInputIntroduction,
	"aero-spinbox": aeroSpinboxIntroduction,
	"aero-progress-spinner": aeroProgressSpinnerIntroduction,
	"aero-resizable-box": aeroResizableBoxIntroduction,
} as const;
