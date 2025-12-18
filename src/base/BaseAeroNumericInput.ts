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
	/**
	 * The underlying HTML input element.
	 * @private
	 */
	private _input!: HTMLInputElement;

	/**
	 * The HTML input element's value.
	 * @private
	 */
	private _value!: string;

	/**
	 * The minimum allowed value.
	 * @private
	 */
	private _min!: string;
	/**
	 * The maximum allowed value.
	 * @private
	 */
	private _max!: string;
	/**
	 * The stepping interval.
	 * @private
	 */
	private _step!: string;

	/**
	 * The number of decimal places to round to, inferred from the `step` value.
	 * @private
	 */
	private _decimalPlaces!: string;

	/**
	 * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
	 * @protected
	 */
	protected constructor(htmlTemplate: string) {
		super(htmlTemplate);

		this.initializeInput();

		this.dispatchInputEvents();

		this.updateInputValue(this.getAttribute("value"));
		this.updateMinValue(this.getAttribute("min"));
		this.updateMaxValue(this.getAttribute("max"));
		this.updateStepValue(this.getAttribute("step"));
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
	private initializeInput() {
		this._input = this.query(this.getInputSelector());
	}

	/**
	 * Validates and sanitizes a given value according to the `min`, `max`, and `step` properties.
	 * @param {string} value - The value to validate.
	 * @returns {string} The validated and sanitized value.
	 * @protected
	 */
	protected getValidateValue(value: string): string {
		const newValue = Math.min(
			Number(this._max),
			Math.max(
				Number(this._min),
				Math.round(Number(value) / Number(this._step)) * Number(this._step)
			)
		);
		return newValue.toFixed(Number(this._decimalPlaces));
	}

	/**
	 * Sets up event listeners on the input element to forward native events.
	 * @private
	 */
	private dispatchInputEvents() {
		this._input.addEventListener("input", () => {
			this.forwardNativeEvent("input")
		})

		this._input.addEventListener("change", () => {
			this.forwardNativeEvent("change")
		})

		this._input.addEventListener("focusin", () => {
			this.forwardNativeEvent("focusin")
		})

		this._input.addEventListener("focusout", () => {
			const validatedValue = this.getValidateValue(this._input.value);
			this.value = validatedValue;

			this.forwardNativeEvent("focusout")
		})
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
		this.baseAeroNumericInputAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions.
	 * @private
	 */
	private baseAeroNumericInputAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		value: (newValue) => {
			this.updateInputValue(newValue);
		},
		min: (newValue) => {
			this.updateMinValue(newValue);
		},
		max: (newValue) => {
			this.updateMaxValue(newValue);
		},
		step: (newValue) => {
			this.updateStepValue(newValue);
		},
	};

	/**
	 * Updates the internal `_value` value.
	 * @param {string | null} val - The new input value.
	 * @private
	 */
	private updateInputValue(val: string | null) {
		this._value = val ? this.getValidateValue(val) : "0";
		this._input.value = this._value;
	}

	/**
	 * Updates the internal `_min` value.
	 * @param {string | null} val - The new minimum value.
	 * @private
	 */
	private updateMinValue(val: string | null) {
		this._min = val ? val : "0";
	}

	/**
	 * Updates the internal `_max` value.
	 * @param {string | null} val - The new maximum value.
	 * @private
	 */
	private updateMaxValue(val: string | null) {
		this._max = val ? val : "100";
	}

	/**
	 * Updates the internal `_step` value and calculates the number of decimal places.
	 * @param {string | null} val - The new step value.
	 * @private
	 */
	private updateStepValue(val: string | null) {
		this._step = val ? val : "1";
		this._decimalPlaces =
			this._step.toString().split(".")[1]?.length.toString() || "0";
	}

	/**
	 * The underlying HTML input element.
	 * @type {HTMLInputElement}
	 * @readonly
	 */
	get input() {
		return this._input;
	}

	/**
	 * The current value of the numeric input.
	 * @type {string}
	 * @attr
	 * @default "0"
	 */
	get value() {
		return this._value;
	}
	set value(val: string) {
		this.setAttribute("value", val);
	}

	/**
	 * The minimum allowed value.
	 * @type {string}
	 * @attr
	 * @default "0"
	 */
	get min() {
		return this._min;
	}
	set min(val: string) {
		this.setAttribute("min", val);
	}

	/**
	 * The maximum allowed value.
	 * @type {string}
	 * @attr
	 * @default "100"
	 */
	get max() {
		return this._max;
	}
	set max(val: string) {
		this.setAttribute("max", val);
	}

	/**
	 * The stepping interval for the numeric input.
	 * @type {string}
	 * @attr
	 * @default "1"
	 */
	get step() {
		return this._step;
	}
	set step(val: string) {
		this.setAttribute("step", val);
	}

	/**
	 * The number of decimal places, derived from the `step` attribute.
	 * @type {string}
	 * @readonly
	 * @protected
	 */
	protected get decimalPlaces() {
		return this._decimalPlaces;
	}
}
