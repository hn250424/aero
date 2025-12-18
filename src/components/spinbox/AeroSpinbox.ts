import aeroSpinboxHtmlTemplate from "./AeroSpinbox.html?raw";
import BaseAeroNumericInput from "../../base/BaseAeroNumericInput";

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
	private minus: HTMLElement;
	/**
	 * The increment button element.
	 * @private
	 */
	private plus: HTMLElement;

	constructor() {
		super(aeroSpinboxHtmlTemplate);

		this.minus = this.query("#minus");
		this.plus = this.query("#plus");

		this.minus.addEventListener("click", this.decrement.bind(this));
		this.plus.addEventListener("click", this.increment.bind(this));

		this.updateButtonBackgrondColor(
			this.getAttribute("button-backgroundcolor")
		);
		this.updateMinuxText(this.getAttribute("minus-text"));
		this.updatePlusText(this.getAttribute("plus-text"));
		this.updateHeight(parseInt(getComputedStyle(this).height));

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newHeight = entry.contentRect.height;
				this.applyStyles(
					`#spinbox {
						grid-template-columns: ${newHeight}px 1fr ${newHeight}px;
					}`
				);
			}
		});
		resizeObserver.observe(this);
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
		this.aeroSpinboxAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions for this component.
	 * @private
	 */
	private aeroSpinboxAttributeHandlers: Record<
		string,
		(val: string | null) => void
	> = {
		"minus-text": (val) => {
			this.updateMinuxText(val);
		},
		"plus-text": (val) => {
			this.updatePlusText(val);
		},
		"button-backgroundcolor": (val) => {
			this.updateButtonBackgrondColor(val);
		},
	};

	/**
	 * Updates the text content of the decrement button.
	 * @param {string | null} val - The new text.
	 * @private
	 */
	private updateMinuxText(val: string | null) {
		this.minus.textContent = val ? val : "-";
	}

	/**
	 * Updates the text content of the increment button.
	 * @param {string | null} val - The new text.
	 * @private
	 */
	private updatePlusText(val: string | null) {
		this.plus.textContent = val ? val : "+";
	}

	/**
	 * Updates the background color of the buttons.
	 * @param {string | null} val - The new color.
	 * @private
	 */
	private updateButtonBackgrondColor(val: string | null) {
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
	private updateHeight(val: number | null) {
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
		const num = Number(this.input.value) - Number(this.step);
		this.input.value = this.getValidateValue(num.toString());
	}

	/**
	 * Increments the input value by the step amount.
	 */
	increment() {
		let num = Number(this.input.value) + Number(this.step);
		this.input.value = this.getValidateValue(num.toString());
	}
}

customElements.define("aero-spinbox", AeroSpinbox);
