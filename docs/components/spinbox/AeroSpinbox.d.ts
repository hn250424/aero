import { default as BaseAeroNumericInput } from '../../base/BaseAeroNumericInput';
/**
 * @module components
 */
/**
 * A numeric input component with increment and decrement buttons.
 *
 * @extends BaseAeroNumericInput
 *
 */
export default class AeroSpinbox extends BaseAeroNumericInput {
    /**
     * The decrement button element.
     * @private
     */
    private minus;
    /**
     * The increment button element.
     * @private
     */
    private plus;
    constructor();
    /**
     * Returns the CSS selector for the internal input element.
     * @returns {string} The CSS selector.
     * @protected
     */
    protected getInputSelector(): string;
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
     * A map of attribute names to their respective handler functions for this component.
     * @private
     */
    private aeroSpinboxAttributeHandlers;
    /**
     * Updates the text content of the decrement button.
     * @param {string | null} val - The new text.
     * @private
     */
    private updateMinuxText;
    /**
     * Updates the text content of the increment button.
     * @param {string | null} val - The new text.
     * @private
     */
    private updatePlusText;
    /**
     * Updates the background color of the buttons.
     * @param {string | null} val - The new color.
     * @private
     */
    private updateButtonBackgrondColor;
    /**
     * Adjusts the grid layout based on the component's height.
     * @param {number | null} val - The new height.
     * @private
     */
    private updateHeight;
    /**
     * The background color of the increment and decrement buttons.
     * @param {string} color - The color value.
     * @type {string}
     * @attr button-backgroundcolor
     * @default "#ccc"
     */
    set buttonBackgroundColor(color: string);
    /**
     * The text content for the decrement button.
     * @param {string} text - The text to display.
     * @type {string}
     * @attr minus-text
     * @default "-"
     */
    set minusText(text: string);
    /**
     * The text content for the increment button.
     * @param {string} text - The text to display.
     * @type {string}
     * @attr plus-text
     * @default "+"
     */
    set plusText(text: string);
    /**
     * Decrements the input value by the step amount.
     */
    decrement(): void;
    /**
     * Increments the input value by the step amount.
     */
    increment(): void;
}
