import { AeroShadowElement } from "../core/AeroShadowElement";

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
export abstract class BaseAeroNumericInput extends AeroShadowElement {
	/** @private */
	private _boundDispatchInputEvent = this._dispatchInputEvent.bind(this);
	/** @private */
	private _boundDispatchChangeEvent = this._dispatchChangeEvent.bind(this);
	/** @private */
	private _boundDispatchFocusinEvent = this._dispatchFocusinEvent.bind(this);
	/** @private */
	private _boundDispatchFocusoutEvent = this._dispatchFocusoutEvent.bind(this);

	/**
	 * The underlying HTML input element.
	 * @private
	 */
	private _$input!: HTMLInputElement;

	/**
	 * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
	 * @protected
	 */
	protected constructor(htmlTemplate: string) {
		super(htmlTemplate);

		this._initializeInput();

		this._syncUI(this.getAttribute("value"));
	}

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
	private _initializeInput() {
		this._$input = this.query(this.getInputSelector());
	}

	/**
	 * Validates and sanitizes the numeric value.
	 * @param {number} value - The value to validate.
	 * @returns {number} The validated and sanitized value.
	 * @protected
	 */
	protected getValidateValue(value: number): number {
		const numValue = isNaN(value) ? this.min : value;

		// Clamp
		const clampedValue = Math.max(this.min, Math.min(this.max, numValue));

		// Calculate the offset from the minimum value.
		// Stepping logic should be relative to 'min', not zero.
		const offset = clampedValue - this.min;

		// Round the offset to the nearest multiple of 'step'.
		const steppedOffset = Math.round(offset / this.step) * this.step;

		// Apply the stepped offset back to 'min'.
		let newValue = this.min + steppedOffset;

		// Final safety check: if rounding pushed the value above 'max',
		// move back by one step.
		if (newValue > this.max) {
			newValue = newValue - this.step;
		}

		/**
		 * Use toFixed() followed by Number() to eliminate floating-point arithmetic errors
		 * (e.g., 0.30000000000000004 -> 0.3) and return a clean numeric value.
		 */
		return Number(newValue.toFixed(this.decimalPlaces));
	}

	/**
	 * Lifecycle callback: Invoked when the component is added to the DOM.
	 * Registers input-related event listeners.
	 */
	connectedCallback() {
		this._$input.addEventListener("input", this._boundDispatchInputEvent);
		this._$input.addEventListener("change", this._boundDispatchChangeEvent);
		this._$input.addEventListener("focusin", this._boundDispatchFocusinEvent);
		this._$input.addEventListener("focusout", this._boundDispatchFocusoutEvent);
	}

	/**
	 * Lifecycle callback: Invoked when the component is removed from the DOM.
	 * Cleans up event listeners to prevent memory leaks.
	 */
	disconnectedCallback() {
		this._$input.removeEventListener("input", this._boundDispatchInputEvent);
		this._$input.removeEventListener("change", this._boundDispatchChangeEvent);
		this._$input.removeEventListener(
			"focusin",
			this._boundDispatchFocusinEvent
		);
		this._$input.removeEventListener(
			"focusout",
			this._boundDispatchFocusoutEvent
		);
	}

	/**
	 * Handles the native 'input' event, stopping propagation and forwarding it.
	 * @param {Event} event - The native event object.
	 * @private
	 */
	private _dispatchInputEvent(event: Event) {
		event.stopImmediatePropagation();
		this.forwardNativeEvent("input");
	}

	/**
	 * Handles the native 'change' event, validates the current value, and forwards it.
	 * @param {Event} event - The native event object.
	 * @private
	 */
	private _dispatchChangeEvent(event: Event) {
		event.stopImmediatePropagation();

		const validatedValue = this.getValidateValue(this._$input.valueAsNumber);
		this.value = validatedValue;

		this.forwardNativeEvent("change");
	}

	/**
	 * Handles the native 'focusin' event.
	 * @param {Event} event - The native event object.
	 * @private
	 */
	private _dispatchFocusinEvent(event: Event) {
		event.stopImmediatePropagation();
		this.forwardNativeEvent("focusin");
	}

	/**
	 * Handles the native 'focusout' event, validates the current value, and forwards it.
	 * @param {Event} event - The native event object.
	 * @private
	 */
	private _dispatchFocusoutEvent(event: Event) {
		event.stopImmediatePropagation();

		const validatedValue = this.getValidateValue(this._$input.valueAsNumber);
		this.value = validatedValue;

		this.forwardNativeEvent("focusout");
	}

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return ["value", "min", "max", "step"];
	}

	/**
	 * Called when an observed attribute has been added, removed, or changed.
	 * @param {string} name - The name of the attribute that changed.
	 * @param {string | null} _oldValue - The old value of the attribute.
	 * @param {string | null} newValue - The new value of the attribute.
	 */
	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this._baseAeroNumericInputAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions.
	 * @private
	 */
	private _baseAeroNumericInputAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		value: (newValue) => {
			this._syncUI(newValue);
		},
		min: () => {
			this.value = this.value;
		},
		max: () => {
			this.value = this.value;
		},
		step: () => {
			this.value = this.value;
		},
	};

	/**
	 * @param {string | null} val - The new input value.
	 * @private
	 */
	private _syncUI(val: string | null) {
		if (!val) return;
		this._$input.value = val;
	}

	/**
	 * The underlying HTML input element.
	 * @type {HTMLInputElement}
	 * @readonly
	 */
	get input() {
		return this._$input;
	}

	/**
	 * The current value of the numeric input.
	 * @type {number}
	 * @attr
	 * @default 0
	 */
	get value() {
		const v = this.getAttribute("value");
		return v === null ? this.min : Number(v);
	}
	set value(val: number) {
		const validValue = this.getValidateValue(val);
		this.setAttribute("value", String(validValue));
	}

	/**
	 * The minimum allowed value.
	 * @type {number}
	 * @attr
	 * @default 0
	 */
	get min() {
		const v = this.getAttribute("min");
		return v === null || isNaN(Number(v)) ? 0 : Number(v);
	}
	set min(val: number) {
		this.setAttribute("min", String(val));
	}

	/**
	 * The maximum allowed value.
	 * @type {number}
	 * @attr
	 * @default 100
	 */
	get max() {
		const v = this.getAttribute("max");
		return v === null || isNaN(Number(v)) ? 100 : Number(v);
	}
	set max(val: number) {
		this.setAttribute("max", String(val));
	}

	/**
	 * The stepping interval for the numeric input.
	 * @type {number}
	 * @attr
	 * @default 1
	 */
	get step() {
		const v = this.getAttribute("step");
		const n = Number(v);
		return v === null || isNaN(n) || n <= 0 ? 1 : n;
	}
	set step(val: number) {
		this.setAttribute("step", String(val));
	}

	/**
	 * The number of decimal places, derived from the `step` attribute.
	 * Used to handle precision in getValidateValue.
	 * @type {number}
	 * @readonly
	 * @protected
	 */
	protected get decimalPlaces() {
		const stepAttr = this.getAttribute("step");

		if (!stepAttr || isNaN(Number(stepAttr))) return 0;

		const parts = stepAttr?.split(".");
		return parts?.length > 1 ? parts[1].length : 0;
	}
}
