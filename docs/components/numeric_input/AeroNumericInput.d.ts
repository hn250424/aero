import { default as BaseAeroNumericInput } from '../../base/BaseAeroNumericInput';
/**
 * @module components
 */
/**
 * A numeric input web component.
 *
 * @extends BaseAeroNumericInput
 */
export default class AeroNumericInput extends BaseAeroNumericInput {
    constructor();
    /**
     * Returns the CSS selector for the internal input element.
     * @returns {string} The CSS selector.
     * @protected
     */
    protected getInputSelector(): string;
}
