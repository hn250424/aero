import aeroSpinboxHtmlTemplate from "./AeroSpinbox.html?raw";
import { BaseAeroNumericInput } from "../../base/BaseAeroNumericInput";

/**
 * @module components
 */

/**
 * A numeric input component with increment and decrement buttons.
 *
 * @extends BaseAeroNumericInput
 *
 */
export class AeroSpinbox extends BaseAeroNumericInput {
	/** @private */
	private _boundDecrement = this.decrement.bind(this);
	/** @private */
  private _boundIncrement = this.increment.bind(this);

	/**
	 * The decrement button element.
	 * @private
	 */
	private _$minus: HTMLElement;
	/**
	 * The increment button element.
	 * @private
	 */
	private _$plus: HTMLElement;

	/**
   * Observer to handle component resizing for layout adjustments.
   * @private
   */
	private _resizeObserver: ResizeObserver;

	constructor() {
		super(aeroSpinboxHtmlTemplate);

		this._$minus = this.query("#minus");
		this._$plus = this.query("#plus");

		this._updateButtonBackgrondColor(
			this.getAttribute("button-backgroundcolor")
		);
		this._updateMinuxText(this.getAttribute("minus-text"));
		this._updatePlusText(this.getAttribute("plus-text"));
		this._updateHeight(parseInt(getComputedStyle(this).height));

		/**
     * Initialize ResizeObserver to dynamically update the grid layout
     * based on the component's height.
     */
		this._resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newHeight = entry.contentRect.height;
				this.applyStyles(
					`#spinbox {
						grid-template-columns: ${newHeight}px 1fr ${newHeight}px;
					}`
				);
			}
		});
	}

	/**
	 * Returns the CSS selector for the internal input element.
	 * @returns {string} The CSS selector.
	 * @protected
	 */
	protected getInputSelector(): string {
		return "#input";
	}

	/**
   * Lifecycle callback: Invoked when the component is added to the DOM.
   * Sets up event listeners and observers.
   * @returns {void}
   */
	connectedCallback() {
		this._$minus.addEventListener("click", this._boundDecrement);
		this._$plus.addEventListener("click", this._boundIncrement);

		this._resizeObserver.observe(this);
  }

	/**
   * Lifecycle callback: Invoked when the component is removed from the DOM.
   * Cleans up event listeners and observers to prevent memory leaks.
   * @returns {void}
   */
  disconnectedCallback() {
		this._$minus.removeEventListener("click", this._boundDecrement);
		this._$plus.removeEventListener("click", this._boundIncrement);

		this._resizeObserver.disconnect();
  }

	/**
	 * Specifies the observed attributes for the custom element.
	 * @returns {string[]} An array of attribute names to observe.
	 */
	static get observedAttributes() {
		return [
			...super.observedAttributes,
			"minus-text",
			"plus-text",
			"button-backgroundcolor",
		];
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
		super.attributeChangedCallback(name, _oldValue, newValue);
		this._aeroSpinboxAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions for this component.
	 * @private
	 */
	private _aeroSpinboxAttributeHandlers: Record<
		string,
		(val: string | null) => void
	> = {
		"minus-text": (val) => {
			this._updateMinuxText(val);
		},
		"plus-text": (val) => {
			this._updatePlusText(val);
		},
		"button-backgroundcolor": (val) => {
			this._updateButtonBackgrondColor(val);
		},
	};

	/**
	 * Updates the text content of the decrement button.
	 * @param {string | null} val - The new text.
	 * @private
	 */
	private _updateMinuxText(val: string | null) {
		this._$minus.textContent = val ? val : "-";
	}

	/**
	 * Updates the text content of the increment button.
	 * @param {string | null} val - The new text.
	 * @private
	 */
	private _updatePlusText(val: string | null) {
		this._$plus.textContent = val ? val : "+";
	}

	/**
	 * Updates the background color of the buttons.
	 * @param {string | null} val - The new color.
	 * @private
	 */
	private _updateButtonBackgrondColor(val: string | null) {
		this.applyStyles(
			`#spinbox > button {
				background-color: ${val ? val : "#ccc"};
			}`
		);
	}

	/**
	 * Adjusts the grid layout based on the component's height.
	 * @param {number | null} val - The new height.
	 * @private
	 */
	private _updateHeight(val: number | null) {
		val = val ? val : 30;
		this.applyStyles(
			`#spinbox {
				grid-template-columns: ${val}px 1fr ${val}px;
			}`
		);
	}

	/**
	 * The background color of the increment and decrement buttons.
	 * @param {string} color - The color value.
	 * @type {string}
	 * @attr button-backgroundcolor
	 * @default "#ccc"
	 */
	set buttonBackgroundColor(color: string) {
		this.setAttribute("button-backgroundcolor", color);
	}

	/**
	 * The text content for the decrement button.
	 * @param {string} text - The text to display.
	 * @type {string}
	 * @attr minus-text
	 * @default "-"
	 */
	set minusText(text: string) {
		this.setAttribute("minus-text", text);
	}

	/**
	 * The text content for the increment button.
	 * @param {string} text - The text to display.
	 * @type {string}
	 * @attr plus-text
	 * @default "+"
	 */
	set plusText(text: string) {
		this.setAttribute("plus-text", text);
	}

	/**
	 * Decrements the input value by the step amount.
	 */
	decrement() {
		const num = this.value - this.step;
		this.value = this.getValidateValue(num);
	}

	/**
	 * Increments the input value by the step amount.
	 */
	increment() {
		const num = this.value + this.step;
		this.value = this.getValidateValue(num);
	}
}

customElements.define("aero-spinbox", AeroSpinbox);
