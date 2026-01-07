import type { ComponentKeys } from "@site/domain";
import type { PlaygroundWidgets } from "../domain";

import { aeroNumericInput } from "./numeric_input";
import { aeroSpinbox } from "./spinbox";
import { aeroProgressSpinner } from "./progress_spinner";
import { aeroResizableBox } from "./resizable_box";

export const widgets: Record<ComponentKeys, PlaygroundWidgets> = {
  "aero-numeric-input": aeroNumericInput,
  "aero-spinbox": aeroSpinbox,
  "aero-progress-spinner": aeroProgressSpinner,
  "aero-resizable-box": aeroResizableBox,
} as const;
