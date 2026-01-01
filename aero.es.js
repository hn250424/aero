class n extends HTMLElement {
  /**
   * The shadow root for this element.
   * @protected
   */
  shadow;
  /**
   * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
   * @protected
   */
  constructor(t) {
    super();
    const e = document.createElement("template");
    e.innerHTML = t, this.shadow = this.attachShadow({ mode: "open" }), this.shadow.appendChild(e.content.cloneNode(!0));
  }
  /**
   * Queries the shadow DOM for an element matching the given selector.
   * @param {string} selector - The CSS selector to match.
   * @returns {T} The first element matching the selector.
   * @protected
   */
  query(t) {
    return this.shadow.querySelector(t);
  }
  /**
   * Applies a string of CSS to the shadow DOM by creating and appending a `<style>` tag.
   * @param {string} style - The CSS string to apply.
   * @protected
   */
  applyStyles(t) {
    const e = document.createElement("style");
    e.textContent = t, this.shadow.appendChild(e);
  }
  /**
   * Dispatches a standard DOM event from this custom element.
   * @param {string} type - The type of the event to dispatch (e.g., 'click', 'input').
   * @protected
   */
  forwardNativeEvent(t) {
    this.dispatchEvent(
      new Event(t, {
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Dispatches a custom event with an optional detail payload.
   * @param {string} type - The name of the custom event.
   * @param {object} [options] - Options for the custom event.
   * @param {*} [options.detail] - The data payload to send with the event.
   * @param {Event} [options.originalEvent] - The original event that triggered this custom event.
   * @protected
   */
  forwardCustomEvent(t, e) {
    this.dispatchEvent(
      new CustomEvent(
        t,
        {
          detail: e?.detail,
          bubbles: !0,
          composed: !0
        }
      )
    );
  }
}
class a extends n {
  /**
   * The underlying HTML input element.
   * @private
   */
  _input;
  /**
   * The HTML input element's value.
   * @private
   */
  _value;
  /**
   * The minimum allowed value.
   * @private
   */
  _min;
  /**
   * The maximum allowed value.
   * @private
   */
  _max;
  /**
   * The stepping interval.
   * @private
   */
  _step;
  /**
   * The number of decimal places to round to, inferred from the `step` value.
   * @private
   */
  _decimalPlaces;
  /**
   * @param {string} htmlTemplate - The HTML string to be used as the template for the shadow DOM.
   * @protected
   */
  constructor(t) {
    super(t), this.initializeInput(), this.dispatchInputEvents(), this.updateInputValue(this.getAttribute("value")), this.updateMinValue(this.getAttribute("min")), this.updateMaxValue(this.getAttribute("max")), this.updateStepValue(this.getAttribute("step"));
  }
  /**
   * Initializes the `_input` property by querying the shadow DOM.
   * @private
   */
  initializeInput() {
    this._input = this.query(this.getInputSelector());
  }
  /**
   * Validates and sanitizes a given value according to the `min`, `max`, and `step` properties.
   * @param {string} value - The value to validate.
   * @returns {string} The validated and sanitized value.
   * @protected
   */
  getValidateValue(t) {
    return Math.min(
      Number(this._max),
      Math.max(
        Number(this._min),
        Math.round(Number(t) / Number(this._step)) * Number(this._step)
      )
    ).toFixed(Number(this._decimalPlaces));
  }
  /**
   * Sets up event listeners on the input element to forward native events.
   * @private
   */
  dispatchInputEvents() {
    this._input.addEventListener("input", (t) => {
      t.stopImmediatePropagation(), this.forwardNativeEvent("input");
    }), this._input.addEventListener("change", (t) => {
      t.stopImmediatePropagation();
      const e = this.getValidateValue(this._input.value);
      this.value = e, this.forwardNativeEvent("change");
    }), this._input.addEventListener("focusin", (t) => {
      t.stopImmediatePropagation(), this.forwardNativeEvent("focusin");
    }), this._input.addEventListener("focusout", (t) => {
      t.stopImmediatePropagation();
      const e = this.getValidateValue(this._input.value);
      this.value = e, this.forwardNativeEvent("focusout");
    });
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
  attributeChangedCallback(t, e, i) {
    this.baseAeroNumericInputAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions.
   * @private
   */
  baseAeroNumericInputAttributeHandlers = {
    value: (t) => {
      this.updateInputValue(t);
    },
    min: (t) => {
      this.updateMinValue(t);
    },
    max: (t) => {
      this.updateMaxValue(t);
    },
    step: (t) => {
      this.updateStepValue(t);
    }
  };
  /**
   * Updates the internal `_value` value.
   * @param {string | null} val - The new input value.
   * @private
   */
  updateInputValue(t) {
    this._value = t ? this.getValidateValue(t) : "0", this._input.value = this._value;
  }
  /**
   * Updates the internal `_min` value.
   * @param {string | null} val - The new minimum value.
   * @private
   */
  updateMinValue(t) {
    this._min = t || "0";
  }
  /**
   * Updates the internal `_max` value.
   * @param {string | null} val - The new maximum value.
   * @private
   */
  updateMaxValue(t) {
    this._max = t || "100";
  }
  /**
   * Updates the internal `_step` value and calculates the number of decimal places.
   * @param {string | null} val - The new step value.
   * @private
   */
  updateStepValue(t) {
    this._step = t || "1", this._decimalPlaces = this._step.toString().split(".")[1]?.length.toString() || "0";
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
  set value(t) {
    this.setAttribute("value", t);
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
  set min(t) {
    this.setAttribute("min", t);
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
  set max(t) {
    this.setAttribute("max", t);
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
  set step(t) {
    this.setAttribute("step", t);
  }
  /**
   * The number of decimal places, derived from the `step` attribute.
   * @type {string}
   * @readonly
   * @protected
   */
  get decimalPlaces() {
    return this._decimalPlaces;
  }
}
const h = `<style>\r
	:host {\r
		border: 1px solid #ccc;\r
		display: block;\r
\r
		width: 100px;\r
		height: 30px;\r
	}\r
\r
	#input {\r
		width: 100%;\r
		height: 100%;\r
		padding: 0;\r
		border: none;\r
\r
		text-align: inherit;\r
		font-size: inherit;\r
		color: inherit;\r
	}\r
\r
	#input:focus {\r
		outline: none;\r
	}\r
	#input::-webkit-inner-spin-button {\r
		appearance: none;\r
	}\r
</style>\r
\r
<input id="input" type="number" />\r
`;
class u extends a {
  constructor() {
    super(h);
  }
  /**
   * Returns the CSS selector for the internal input element.
   * @returns {string} The CSS selector.
   * @protected
   */
  getInputSelector() {
    return "#input";
  }
}
customElements.define("aero-numeric-input", u);
const d = `<style>\r
	:host {\r
		border: 1px solid #ccc;\r
		display: block;\r
\r
		width: 130px;\r
		height: 30px;\r
	}\r
\r
	#spinbox {\r
		display: grid;\r
	}\r
\r
	#spinbox,\r
	#spinbox > * {\r
		width: 100%;\r
		height: 100%;\r
		border: none;\r
		font-size: inherit;\r
		color: inherit;\r
	}\r
\r
	#spinbox > button {\r
		cursor: pointer;\r
	}\r
\r
	#input {\r
		padding: 0;\r
		text-align: center;\r
	}\r
\r
	#input:focus {\r
		outline: none;\r
	}\r
	#input::-webkit-inner-spin-button {\r
		appearance: none;\r
	}\r
</style>\r
\r
<div id="spinbox">\r
	<button id="minus">-</button>\r
	<input id="input" type="number" />\r
	<button id="plus">+</button>\r
</div>\r
`;
class l extends a {
  /**
   * The decrement button element.
   * @private
   */
  minus;
  /**
   * The increment button element.
   * @private
   */
  plus;
  constructor() {
    super(d), this.minus = this.query("#minus"), this.plus = this.query("#plus"), this.minus.addEventListener("click", this.decrement.bind(this)), this.plus.addEventListener("click", this.increment.bind(this)), this.updateButtonBackgrondColor(
      this.getAttribute("button-backgroundcolor")
    ), this.updateMinuxText(this.getAttribute("minus-text")), this.updatePlusText(this.getAttribute("plus-text")), this.updateHeight(parseInt(getComputedStyle(this).height)), new ResizeObserver((e) => {
      for (const i of e) {
        const s = i.contentRect.height;
        this.applyStyles(
          `#spinbox {
						grid-template-columns: ${s}px 1fr ${s}px;
					}`
        );
      }
    }).observe(this);
  }
  /**
   * Returns the CSS selector for the internal input element.
   * @returns {string} The CSS selector.
   * @protected
   */
  getInputSelector() {
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
      "button-backgroundcolor"
    ];
  }
  /**
   * Called when an observed attribute has been added, removed, or changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string | null} _oldValue - The old value of the attribute.
   * @param {string | null} newValue - The new value of the attribute.
   */
  attributeChangedCallback(t, e, i) {
    super.attributeChangedCallback(t, e, i), this.aeroSpinboxAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions for this component.
   * @private
   */
  aeroSpinboxAttributeHandlers = {
    "minus-text": (t) => {
      this.updateMinuxText(t);
    },
    "plus-text": (t) => {
      this.updatePlusText(t);
    },
    "button-backgroundcolor": (t) => {
      this.updateButtonBackgrondColor(t);
    }
  };
  /**
   * Updates the text content of the decrement button.
   * @param {string | null} val - The new text.
   * @private
   */
  updateMinuxText(t) {
    this.minus.textContent = t || "-";
  }
  /**
   * Updates the text content of the increment button.
   * @param {string | null} val - The new text.
   * @private
   */
  updatePlusText(t) {
    this.plus.textContent = t || "+";
  }
  /**
   * Updates the background color of the buttons.
   * @param {string | null} val - The new color.
   * @private
   */
  updateButtonBackgrondColor(t) {
    this.applyStyles(
      `#spinbox > button {
				background-color: ${t || "#ccc"};
			}`
    );
  }
  /**
   * Adjusts the grid layout based on the component's height.
   * @param {number | null} val - The new height.
   * @private
   */
  updateHeight(t) {
    t = t || 30, this.applyStyles(
      `#spinbox {
				grid-template-columns: ${t}px 1fr ${t}px;
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
  set buttonBackgroundColor(t) {
    this.setAttribute("button-backgroundcolor", t);
  }
  /**
   * The text content for the decrement button.
   * @param {string} text - The text to display.
   * @type {string}
   * @attr minus-text
   * @default "-"
   */
  set minusText(t) {
    this.setAttribute("minus-text", t);
  }
  /**
   * The text content for the increment button.
   * @param {string} text - The text to display.
   * @type {string}
   * @attr plus-text
   * @default "+"
   */
  set plusText(t) {
    this.setAttribute("plus-text", t);
  }
  /**
   * Decrements the input value by the step amount.
   */
  decrement() {
    const t = Number(this.input.value) - Number(this.step);
    this.value = this.getValidateValue(t.toString());
  }
  /**
   * Increments the input value by the step amount.
   */
  increment() {
    const t = Number(this.input.value) + Number(this.step);
    this.value = this.getValidateValue(t.toString());
  }
}
customElements.define("aero-spinbox", l);
const p = `<style>\r
	@keyframes spin {\r
		0% {\r
			transform: rotate(0deg);\r
		}\r
\r
		100% {\r
			transform: rotate(360deg);\r
		}\r
	}\r
</style>\r
`;
class g extends n {
  constructor() {
    super(p), this.updateSpinnerStyles();
  }
  /**
   * Specifies the observed attributes for the custom element.
   * @returns {string[]} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ["width", "height", "background", "color", "cycle"];
  }
  /**
   * Called when an observed attribute has been added, removed, or changed.
   */
  attributeChangedCallback(t, e, i) {
    this.updateSpinnerStyles();
  }
  /**
   * Updates the spinner's styles based on its current attributes.
   * Using :host instead of an inner element means styles are applied to the custom element itself.
   * Re-appending styles multiple times can cause conflicts or unexpected behavior.
   * @private
   */
  updateSpinnerStyles() {
    const t = this.getAttribute("width") || "50", e = this.getAttribute("height") || "50", i = this.getAttribute("background") || "white", s = this.getAttribute("color") || "black", o = this.getAttribute("cycle") || "1";
    this.applyStyles(`
			:host {
					width: ${t}px;
					height: ${e}px;
					border: 5px solid ${i};
					border-top-color: ${s};
					border-radius: 50%;
					animation: spin ${o}s linear infinite;
					box-sizing: border-box;
			}

			@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
			}
		`);
  }
  /**
   * The width of the spinner in pixels.
   * @param {string} val - The width value.
   * @attr
   * @default "50"
   */
  set width(t) {
    this.setAttribute("width", t);
  }
  /**
   * The height of the spinner in pixels.
   * @param {string} val - The height value.
   * @attr
   * @default "50"
   */
  set height(t) {
    this.setAttribute("height", t);
  }
  /**
   * The color of the spinner's track.
   * @param {string} val - The background color value.
   * @attr
   * @default "white"
   */
  set background(t) {
    this.setAttribute("background", t);
  }
  /**
   * The color of the spinner's moving part.
   * @param {string} val - The color value.
   * @attr
   * @default "black"
   */
  set color(t) {
    this.setAttribute("color", t);
  }
  /**
   * The duration of one spin cycle in seconds.
   * @param {string} val - The cycle duration.
   * @attr
   * @default "1"
   */
  set cycle(t) {
    this.setAttribute("cycle", t);
  }
}
customElements.define("aero-progress-spinner", g);
const m = `<style>\r
	:host {\r
		position: relative;\r
	}\r
\r
	.resizer {\r
		position: absolute;\r
		background-color: transparent;\r
		transition: background-color 0.3s ease;\r
	}\r
\r
	.horizontal {\r
		width: 3px;\r
		height: 100%;\r
		cursor: ew-resize;\r
	}\r
\r
	.vertical {\r
		width: 100%;\r
		height: 3px;\r
		cursor: ns-resize;\r
	}\r
\r
	#top {\r
		left: 0;\r
		top: 0;\r
	}\r
\r
	#bottom {\r
		left: 0;\r
		bottom: 0;\r
	}\r
\r
	#left {\r
		top: 0;\r
		left: 0;\r
	}\r
\r
	#right {\r
		top: 0;\r
		right: 0;\r
	}\r
</style>\r
\r
<slot></slot>\r
<div id="top" class="resizer vertical"></div>\r
<div id="bottom" class="resizer vertical"></div>\r
<div id="left" class="resizer horizontal"></div>\r
<div id="right" class="resizer horizontal"></div>\r
`;
class c extends n {
  _topResizer;
  _bottomResizer;
  _leftResizer;
  _rightResizer;
  _hasTopResizer;
  _hasBottomResizer;
  _hasLeftResizer;
  _hasRightResizer;
  _nMinWidth;
  _nMaxWidth;
  _nMinHeight;
  _nMaxHeight;
  isTopDragging = !1;
  isBottomDragging = !1;
  isLeftDragging = !1;
  isRightDragging = !1;
  isDragging = !1;
  animationFrameId = null;
  resizerHandlers = {
    top: (t) => this.processMousedownEvent(t, "top"),
    bottom: (t) => this.processMousedownEvent(t, "bottom"),
    left: (t) => this.processMousedownEvent(t, "left"),
    right: (t) => this.processMousedownEvent(t, "right")
  };
  constructor() {
    super(m), this._topResizer = this.query("#top"), this._bottomResizer = this.query("#bottom"), this._leftResizer = this.query("#left"), this._rightResizer = this.query("#right"), this.updateMinWidthValue(this.getAttribute("min-width")), this.updateMaxWidthValue(this.getAttribute("max-width")), this.updateMinHeightValue(this.getAttribute("min-height")), this.updateMaxHeightValue(this.getAttribute("max-height")), this.updateTopResizerState(this.hasAttribute("resize-top")), this.updateBottomResizerState(this.hasAttribute("resize-bottom")), this.updateLeftResizerState(this.hasAttribute("resize-left")), this.updateRightResizerState(this.hasAttribute("resize-right")), document.addEventListener("mousemove", (t) => {
      this.isDragging && (this.animationFrameId && cancelAnimationFrame(this.animationFrameId), this.animationFrameId = requestAnimationFrame(() => {
        const e = this.getBoundingClientRect();
        if (this.isTopDragging) {
          const i = e.bottom - t.clientY, s = Math.min(
            Math.max(i, this._nMinHeight),
            this._nMaxHeight
          );
          this.style.height = `${s}px`, this.emitResize(null, s);
        } else if (this.isBottomDragging) {
          const i = t.clientY - e.top, s = Math.min(
            Math.max(i, this._nMinHeight),
            this._nMaxHeight
          );
          this.style.height = `${s}px`, this.emitResize(null, s);
        } else if (this.isLeftDragging) {
          const i = e.right - t.clientX, s = Math.min(
            Math.max(i, this._nMinWidth),
            this._nMaxWidth
          );
          this.style.width = `${s}px`, this.emitResize(s, null);
        } else if (this.isRightDragging) {
          const i = t.clientX - e.left, s = Math.min(
            Math.max(i, this._nMinWidth),
            this._nMaxWidth
          );
          this.style.width = `${s}px`, this.emitResize(s, null);
        }
      }));
    }), document.addEventListener("mouseup", () => {
      this.isDragging && (this.forwardCustomEvent("aero-resize-end", {
        detail: {
          width: this.offsetWidth,
          height: this.offsetHeight
        }
      }), this.animationFrameId && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), document.body.style.cursor = "default", document.body.style.userSelect = "auto", this.isDragging = !1, this.isTopDragging = !1, this.isBottomDragging = !1, this.isLeftDragging = !1, this.isRightDragging = !1);
    });
  }
  /**
   * Handles the mousedown event on a resizer element.
   * @param {MouseEvent} e - The mouse event.
   * @param {"top" | "bottom" | "left" | "right"} resizer - The resizer that was clicked.
   * @private
   */
  processMousedownEvent = (t, e) => {
    switch (t.preventDefault(), document.body.style.userSelect = "none", this.isDragging = !0, this.forwardCustomEvent("aero-resize-start", {
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight,
        edge: e
      }
    }), e) {
      case "top":
        this.isTopDragging = !0, document.body.style.cursor = "ns-resize";
        break;
      case "bottom":
        this.isBottomDragging = !0, document.body.style.cursor = "ns-resize";
        break;
      case "left":
        this.isLeftDragging = !0, document.body.style.cursor = "ew-resize";
        break;
      case "right":
        this.isRightDragging = !0, document.body.style.cursor = "ew-resize";
        break;
    }
  };
  /**
   * Emits the 'aero-resize' custom event.
   * @param {number | null} width - The new width, or null if not changed.
   * @param {number | null} height - The new height, or null if not changed.
   * @private
   */
  emitResize(t, e) {
    this.forwardCustomEvent("aero-resize", {
      detail: {
        width: t,
        height: e
      }
    });
  }
  /**
   * Specifies the observed attributes for the custom element.
   * @returns {string[]} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return [
      "min-width",
      "max-width",
      "min-height",
      "max-height",
      "resize-top",
      "resize-bottom",
      "resize-left",
      "resize-right",
      "resizer-color"
    ];
  }
  /**
   * Called when an observed attribute has been added, removed, or changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string | null} _oldValue - The old value of the attribute.
   * @param {string | null} newValue - The new value of the attribute.
   */
  attributeChangedCallback(t, e, i) {
    this.baseAeroResizeBoxAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions.
   * @private
   */
  baseAeroResizeBoxAttributeHandlers = {
    "min-width": (t) => {
      this.updateMinWidthValue(t);
    },
    "max-width": (t) => {
      this.updateMaxWidthValue(t);
    },
    "min-height": (t) => {
      this.updateMinHeightValue(t);
    },
    "max-height": (t) => {
      this.updateMaxHeightValue(t);
    },
    "resize-top": (t) => {
      this.updateTopResizerState(t !== null);
    },
    "resize-bottom": (t) => {
      this.updateBottomResizerState(t !== null);
    },
    "resize-left": (t) => {
      this.updateLeftResizerState(t !== null);
    },
    "resize-right": (t) => {
      this.updateRightResizerState(t !== null);
    },
    "resizer-color": (t) => {
      const e = t ?? "#ccc";
      this.applyStyles(`.resizer:hover { background-color: ${e}; }`);
    }
  };
  /**
   * Enables or disables the top resizer.
   * @param {boolean} enabled - Whether the resizer should be enabled.
   * @private
   */
  updateTopResizerState(t) {
    this._hasTopResizer = t, this.updateResizeState(
      this._topResizer,
      this._hasTopResizer,
      this.resizerHandlers.top
    );
  }
  /**
   * Enables or disables the bottom resizer.
   * @param {boolean} enabled - Whether the resizer should be enabled.
   * @private
   */
  updateBottomResizerState(t) {
    this._hasBottomResizer = t, this.updateResizeState(
      this._bottomResizer,
      this._hasBottomResizer,
      this.resizerHandlers.bottom
    );
  }
  /**
   * Enables or disables the left resizer.
   * @param {boolean} enabled - Whether the resizer should be enabled.
   * @private
   */
  updateLeftResizerState(t) {
    this._hasLeftResizer = t, this.updateResizeState(
      this._leftResizer,
      this._hasLeftResizer,
      this.resizerHandlers.left
    );
  }
  /**
   * Enables or disables the right resizer.
   * @param {boolean} enabled - Whether the resizer should be enabled.
   * @private
   */
  updateRightResizerState(t) {
    this._hasRightResizer = t, this.updateResizeState(
      this._rightResizer,
      this._hasRightResizer,
      this.resizerHandlers.right
    );
  }
  /**
   * A helper function to add or remove the mousedown event listener for a resizer.
   * @param {HTMLElement} resizer - The resizer element.
   * @param {boolean} enabled - Whether the resizer is enabled.
   * @param {(e: MouseEvent) => void} handler - The event handler.
   * @private
   */
  updateResizeState(t, e, i) {
    t.hidden = !e, e ? t.addEventListener("mousedown", i) : t.removeEventListener("mousedown", i);
  }
  /**
   * Updates the internal minimum width value.
   * @param {string | null} val - The new value.
   * @private
   */
  updateMinWidthValue(t) {
    this._nMinWidth = t ? Number(t) : 0;
  }
  /**
   * Updates the internal maximum width value.
   * @param {string | null} val - The new value.
   * @private
   */
  updateMaxWidthValue(t) {
    this._nMaxWidth = t ? Number(t) : 2e3;
  }
  /**
   * Updates the internal minimum height value.
   * @param {string | null} val - The new value.
   * @private
   */
  updateMinHeightValue(t) {
    this._nMinHeight = t ? Number(t) : 0;
  }
  /**
   * Updates the internal maximum height value.
   * @param {string | null} val - The new value.
   * @private
   */
  updateMaxHeightValue(t) {
    this._nMaxHeight = t ? Number(t) : 2e3;
  }
  /**
   * The color of the resizer handles on hover.
   * @param {string} color - The color value.
   * @type {string}
   * @attr
   * @default "#ccc"
   */
  set resizerColor(t) {
    this.setAttribute("resizer-color", t);
  }
  /**
   * The minimum width of the box.
   * @type {string}
   * @attr min-width
   * @default "0"
   */
  get minWidth() {
    return this._nMinWidth.toString();
  }
  set minWidth(t) {
    this.setAttribute("min-width", t);
  }
  /**
   * The maximum width of the box.
   * @type {string}
   * @attr max-width
   * @default "2000"
   */
  get maxWidth() {
    return this._nMaxWidth.toString();
  }
  set maxWidth(t) {
    this.setAttribute("max-width", t);
  }
  /**
   * The minimum height of the box.
   * @type {string}
   * @attr min-height
   * @default "0"
   */
  get minHeight() {
    return this._nMinHeight.toString();
  }
  set minHeight(t) {
    this.setAttribute("min-height", t);
  }
  /**
   * The maximum height of the box.
   * @type {string}
   * @attr max-height
   * @default "2000"
   */
  get maxHeight() {
    return this._nMaxHeight.toString();
  }
  set maxHeight(t) {
    this.setAttribute("max-height", t);
  }
  /**
   * Enables the top resizer.
   */
  addTopResizer() {
    this.setAttribute("resize-top", "");
  }
  /**
   * Disables the top resizer.
   */
  removeTopResizer() {
    this.removeAttribute("resize-top");
  }
  /**
   * Enables the bottom resizer.
   */
  addBottomResizer() {
    this.setAttribute("resize-bottom", "");
  }
  /**
   * Disables the bottom resizer.
   */
  removeBottomResizer() {
    this.removeAttribute("resize-bottom");
  }
  /**
   * Enables the left resizer.
   */
  addLeftResizer() {
    this.setAttribute("resize-left", "");
  }
  /**
   * Disables the left resizer.
   */
  removeLeftResizer() {
    this.removeAttribute("resize-left");
  }
  /**
   * Enables the right resizer.
   */
  addRightResizer() {
    this.setAttribute("resize-right", "");
  }
  /**
   * Disables the right resizer.
   */
  removeRightResizer() {
    this.removeAttribute("resize-right");
  }
}
customElements.define("aero-resize-box", c);
export {
  u as AeroNumericInput,
  g as AeroProgressSpinner,
  c as AeroResizeBox,
  l as AeroSpinbox
};
