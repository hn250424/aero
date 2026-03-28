import { BaseAeroNumericInput } from '../../base/BaseAeroNumericInput';
/**
 * @module components
 */
/**
 * A numeric input component with increment and decrement buttons.
 *
 * @extends BaseAeroNumericInput
 *
 * @cssprop [--aero-spinbox-button-background=lightgrey] - The background color of the increment and decrement buttons.
 */
export declare class AeroSpinbox extends BaseAeroNumericInput {
    private _boundDecrement;
    private _boundIncrement;
    private _$minus;
    private _$plus;
    private _resizeObserver;
    constructor();
    protected getInputSelector(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private _aeroSpinboxAttributeHandlers;
    private _updateMinuxText;
    private _updatePlusText;
    private _updateHeight;
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
declare global {
    interface HTMLElementTagNameMap {
        "aero-spinbox": AeroSpinbox;
    }
}
