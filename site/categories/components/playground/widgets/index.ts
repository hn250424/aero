import type { ComponentKeys } from "@site/domain";
import type { PlaygroundWidgets } from "../domain";

import { aeroNumericInput } from "./numeric_input";
import { aeroSpinbox } from "./spinbox";
import { aeroIndeterminateSpinner } from "./indeterminate_spinner";
import { aeroResizableBox } from "./resizable_box";
import { aeroSelect } from "./select";
import { aeroOption } from "./option";
import { aeroToast } from "./toast";
import { aeroPopup } from "./popup";

export const widgets: Record<ComponentKeys, PlaygroundWidgets> = {
  "aero-numeric-input": aeroNumericInput,
  "aero-spinbox": aeroSpinbox,
  "aero-indeterminate-spinner": aeroIndeterminateSpinner,
  "aero-resizable-box": aeroResizableBox,
	"aero-select": aeroSelect,
	"aero-option": aeroOption,
	"aero-toast": aeroToast,
	"aero-popup": aeroPopup,
} as const;
