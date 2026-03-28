import { BaseAeroNumericInput } from '../../base/BaseAeroNumericInput';
/**
 * @module components
 */
/**
 * A numeric input web component.
 *
 * @extends BaseAeroNumericInput
 */
export declare class AeroNumericInput extends BaseAeroNumericInput {
    constructor();
    protected getInputSelector(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        "aero-numeric-input": AeroNumericInput;
    }
}
