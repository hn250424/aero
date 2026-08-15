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
 * @fires input - Fired when the value changes, including via the increment/decrement buttons.
 * @fires change - Fired when the value is committed, including via the increment/decrement buttons.
 *
 * @cssprop [--aero-spinbox-button-background=lightgrey] - The background color of the increment and decrement buttons.
 */
export class AeroSpinbox extends BaseAeroNumericInput {
  private _boundDecrement = this.decrement.bind(this);
  private _boundIncrement = this.increment.bind(this);
  private _$minus: HTMLElement;
  private _$plus: HTMLElement;
  private _resizeObserver: ResizeObserver;

  constructor() {
    super(aeroSpinboxHtmlTemplate);

    this._$minus = this.query<HTMLElement>("#minus");
    this._$plus = this.query<HTMLElement>("#plus");

    this._updateMinusText(this.getAttribute("minus-text"));
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

  protected getInputSelector(): string {
    return "#input";
  }

  connectedCallback() {
    super.connectedCallback();

    this._$minus.addEventListener("click", this._boundDecrement);
    this._$plus.addEventListener("click", this._boundIncrement);

    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._$minus.removeEventListener("click", this._boundDecrement);
    this._$plus.removeEventListener("click", this._boundIncrement);

    this._resizeObserver.disconnect();
  }

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "minus-text",
      "plus-text",
    ];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    super.attributeChangedCallback(name, _oldValue, newValue);
    this._aeroSpinboxAttributeHandlers[name]?.(newValue);
  }

  private _aeroSpinboxAttributeHandlers: Record<
    string,
    (val: string | null) => void
  > = {
    "minus-text": (val) => {
      this._updateMinusText(val);
    },
    "plus-text": (val) => {
      this._updatePlusText(val);
    },
  };

  private _updateMinusText(val: string | null) {
    this._$minus.textContent = val ? val : "-";
  }

  private _updatePlusText(val: string | null) {
    this._$plus.textContent = val ? val : "+";
  }

  private _updateHeight(val: number | null) {
    val = val ? val : 30;
    this.applyStyles(
      `#spinbox {
        grid-template-columns: ${val}px 1fr ${val}px;
      }`
    );
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
   * Fires `input` and `change` events when the value actually changes.
   */
  decrement() {
    this._stepBy(-this.step);
  }

  /**
   * Increments the input value by the step amount.
   * Fires `input` and `change` events when the value actually changes.
   */
  increment() {
    this._stepBy(this.step);
  }

  private _stepBy(delta: number) {
    const previous = this.value;
    this.value = this.getValidateValue(this.value + delta);

    // Mirror native spin buttons: notify listeners only on real changes.
    if (this.value !== previous) {
      this.forwardNativeEvent("input");
      this.forwardNativeEvent("change");
    }
  }
}


