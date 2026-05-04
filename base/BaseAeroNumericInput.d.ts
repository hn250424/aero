import { AeroShadowElement } from '../core/AeroShadowElement';
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
export declare abstract class BaseAeroNumericInput<T extends Record<string, any> = {}> extends AeroShadowElement<T> {
    private _boundDispatchInputEvent;
    private _boundDispatchChangeEvent;
    private _boundDispatchFocusinEvent;
    private _boundDispatchFocusoutEvent;
    private _$input;
    protected constructor(htmlTemplate: string);
    protected abstract getInputSelector(): string;
    private _initializeInput;
    protected getValidateValue(value: number): number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _dispatchInputEvent;
    private _dispatchChangeEvent;
    private _dispatchFocusinEvent;
    private _dispatchFocusoutEvent;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private _baseAeroNumericInputAttributeHandlers;
    private _syncUI;
    /**
     * The underlying HTML input element.
     * @type {HTMLInputElement}
     * @readonly
     */
    get input(): HTMLInputElement;
    /**
     * The current value of the numeric input.
     * @type {number}
     * @attr
     * @default 0
     */
    get value(): number;
    set value(val: number);
    /**
     * The minimum allowed value.
     * @type {number}
     * @attr
     * @default 0
     */
    get min(): number;
    set min(val: number);
    /**
     * The maximum allowed value.
     * @type {number}
     * @attr
     * @default 100
     */
    get max(): number;
    set max(val: number);
    /**
     * The stepping interval for the numeric input.
     * @type {number}
     * @attr
     * @default 1
     */
    get step(): number;
    set step(val: number);
    protected get decimalPlaces(): number;
}
