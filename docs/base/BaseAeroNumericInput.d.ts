import { default as AeroShadowElement } from '../core/AeroShadowElement';
/**
 * @module base
 */
/**
 * An abstract base class for numeric input elements. It provides core functionalities
 * for handling numeric values, including min, max, and step attributes.
 *
 * @extends AeroShadowElement
 * @abstract
 *
 * @fires input - Fired when the value of the element has changed.
 * @fires change - Fired when the value of the element has been committed by the user.
 * @fires focusin - Fired when the element receives focus.
 * @fires focusout - Fired when the element loses focus.
 */
export default abstract class BaseAeroNumericInput extends AeroShadowElement {
    /**
     * The underlying HTML input element.
     * @private
     */
    private _input;
    /**
     * The HTML input element's value.
     * @private
     */
    private _value;
    /**
     * The minimum allowed value.
     * @private
     */
    private _min;
    /**
     * The maximum allowed value.
     * @private
     */
    private _max;
    /**
     * The stepping interval.
     * @private
     */
    private _step;
    /**
     * The number of decimal places to round to, inferred from the `step` value.
     * @private
     */
    private _decimalPlaces;
    /**
     * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
     * @protected
     */
    protected constructor(htmlTemplate: string);
    /**
     * An abstract method that must be implemented by subclasses to provide the CSS selector
     * for the underlying input element.
     * @returns {string} The CSS selector for the input element.
     * @protected
     * @abstract
     */
    protected abstract getInputSelector(): string;
    /**
     * Initializes the `_input` property by querying the shadow DOM.
     * @private
     */
    private initializeInput;
    /**
     * Validates and sanitizes a given value according to the `min`, `max`, and `step` properties.
     * @param {string} value - The value to validate.
     * @returns {string} The validated and sanitized value.
     * @protected
     */
    protected getValidateValue(value: string): string;
    /**
     * Sets up event listeners on the input element to forward native events.
     * @private
     */
    private dispatchInputEvents;
    /**
     * Specifies the observed attributes for the custom element.
     * @returns {string[]} An array of attribute names to observe.
     */
    static get observedAttributes(): string[];
    /**
     * Called when an observed attribute has been added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string | null} _oldValue - The old value of the attribute.
     * @param {string | null} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * A map of attribute names to their respective handler functions.
     * @private
     */
    private baseAeroNumericInputAttributeHandlers;
    /**
     * Updates the internal `_value` value.
     * @param {string | null} val - The new input value.
     * @private
     */
    private updateInputValue;
    /**
     * Updates the internal `_min` value.
     * @param {string | null} val - The new minimum value.
     * @private
     */
    private updateMinValue;
    /**
     * Updates the internal `_max` value.
     * @param {string | null} val - The new maximum value.
     * @private
     */
    private updateMaxValue;
    /**
     * Updates the internal `_step` value and calculates the number of decimal places.
     * @param {string | null} val - The new step value.
     * @private
     */
    private updateStepValue;
    /**
     * The underlying HTML input element.
     * @type {HTMLInputElement}
     * @readonly
     */
    get input(): HTMLInputElement;
    /**
     * The current value of the numeric input.
     * @type {string}
     * @attr
     * @default "0"
     */
    get value(): string;
    set value(val: string);
    /**
     * The minimum allowed value.
     * @type {string}
     * @attr
     * @default "0"
     */
    get min(): string;
    set min(val: string);
    /**
     * The maximum allowed value.
     * @type {string}
     * @attr
     * @default "100"
     */
    get max(): string;
    set max(val: string);
    /**
     * The stepping interval for the numeric input.
     * @type {string}
     * @attr
     * @default "1"
     */
    get step(): string;
    set step(val: string);
    /**
     * The number of decimal places, derived from the `step` attribute.
     * @type {string}
     * @readonly
     * @protected
     */
    protected get decimalPlaces(): string;
}
