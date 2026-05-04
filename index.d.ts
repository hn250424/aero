import { AeroNumericInput } from './components/numeric_input/AeroNumericInput';
import { AeroSpinbox } from './components/spinbox/AeroSpinbox';
import { AeroIndeterminateSpinner } from './components/indeterminate_spinner/AeroIndeterminateSpinner';
import { AeroResizableBox, AeroResizableBoxEvents } from './components/resizable_box/AeroResizableBox';
import { AeroSelect, AeroSelectEvents } from './components/select/AeroSelect';
import { AeroOption } from './components/select/AeroOption';
import { AeroToast, AeroToastOptions } from './components/toast/AeroToast';
import { AeroPopup, AeroPopupOptions } from './components/popup/AeroPopup';
import { AeroRoller, AeroRollerEvents } from './components/roller/AeroRoller';
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
export { AeroNumericInput, AeroSpinbox, AeroIndeterminateSpinner, AeroResizableBox, AeroSelect, AeroOption, AeroToast, AeroPopup, AeroRoller, };
export type { AeroResizableBoxEvents, AeroSelectEvents, AeroToastOptions, AeroPopupOptions, AeroRollerEvents, };
