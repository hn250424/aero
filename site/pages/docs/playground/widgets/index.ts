import type { ComponentKeys } from "../../domain";
import type { PlaygroundWidget } from "../domain";

import AeroNumericInput from "./numeric_input";
import AeroSpinbox from "./spinbox";
import AeroProgressSpinner from "./progress_spinner";
import AeroResizeBox from "./resize_box";

export const widgets: Record<ComponentKeys, PlaygroundWidget> = {
  "aero-numeric-input": AeroNumericInput,
  "aero-spinbox": AeroSpinbox,
  "aero-progress-spinner": AeroProgressSpinner,
  "aero-resize-box": AeroResizeBox,
} as const;
