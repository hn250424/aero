class s extends HTMLElement {
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
class o extends s {
  /** @private */
  _boundDispatchInputEvent = this._dispatchInputEvent.bind(this);
  /** @private */
  _boundDispatchChangeEvent = this._dispatchChangeEvent.bind(this);
  /** @private */
  _boundDispatchFocusinEvent = this._dispatchFocusinEvent.bind(this);
  /** @private */
  _boundDispatchFocusoutEvent = this._dispatchFocusoutEvent.bind(this);
  /**
   * The underlying HTML input element.
   * @private
   */
  _$input;
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
    super(t), this._initializeInput(), this._updateInputValue(this.getAttribute("value")), this._updateMinValue(this.getAttribute("min")), this._updateMaxValue(this.getAttribute("max")), this._updateStepValue(this.getAttribute("step"));
  }
  /**
   * Initializes the `_input` property by querying the shadow DOM.
   * @private
   */
  _initializeInput() {
    this._$input = this.query(this.getInputSelector());
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
    * Lifecycle callback: Invoked when the component is added to the DOM.
    * Registers input-related event listeners.
    */
  connectedCallback() {
    this._$input.addEventListener("input", this._boundDispatchInputEvent), this._$input.addEventListener("change", this._boundDispatchChangeEvent), this._$input.addEventListener("focusin", this._boundDispatchFocusinEvent), this._$input.addEventListener("focusout", this._boundDispatchFocusoutEvent);
  }
  /**
    * Lifecycle callback: Invoked when the component is removed from the DOM.
    * Cleans up event listeners to prevent memory leaks.
    */
  disconnectedCallback() {
    this._$input.removeEventListener("input", this._boundDispatchInputEvent), this._$input.removeEventListener("change", this._boundDispatchChangeEvent), this._$input.removeEventListener("focusin", this._boundDispatchFocusinEvent), this._$input.removeEventListener("focusout", this._boundDispatchFocusoutEvent);
  }
  /**
    * Handles the native 'input' event, stopping propagation and forwarding it.
    * @param {Event} event - The native event object.
    * @private
    */
  _dispatchInputEvent(t) {
    t.stopImmediatePropagation(), this.forwardNativeEvent("input");
  }
  /**
    * Handles the native 'change' event, validates the current value, and forwards it.
    * @param {Event} event - The native event object.
    * @private
    */
  _dispatchChangeEvent(t) {
    t.stopImmediatePropagation();
    const e = this.getValidateValue(this._$input.value);
    this.value = e, this.forwardNativeEvent("change");
  }
  /**
    * Handles the native 'focusin' event.
    * @param {Event} event - The native event object.
    * @private
    */
  _dispatchFocusinEvent(t) {
    t.stopImmediatePropagation(), this.forwardNativeEvent("focusin");
  }
  /**
    * Handles the native 'focusout' event, validates the current value, and forwards it.
    * @param {Event} event - The native event object.
    * @private
    */
  _dispatchFocusoutEvent(t) {
    t.stopImmediatePropagation();
    const e = this.getValidateValue(this._$input.value);
    this.value = e, this.forwardNativeEvent("focusout");
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
    this._baseAeroNumericInputAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions.
   * @private
   */
  _baseAeroNumericInputAttributeHandlers = {
    value: (t) => {
      this._updateInputValue(t);
    },
    min: (t) => {
      this._updateMinValue(t);
    },
    max: (t) => {
      this._updateMaxValue(t);
    },
    step: (t) => {
      this._updateStepValue(t);
    }
  };
  /**
   * Updates the internal `_value` value.
   * @param {string | null} val - The new input value.
   * @private
   */
  _updateInputValue(t) {
    this._value = t ? this.getValidateValue(t) : "0", this._$input.value = this._value;
  }
  /**
   * Updates the internal `_min` value.
   * @param {string | null} val - The new minimum value.
   * @private
   */
  _updateMinValue(t) {
    this._min = t || "0";
  }
  /**
   * Updates the internal `_max` value.
   * @param {string | null} val - The new maximum value.
   * @private
   */
  _updateMaxValue(t) {
    this._max = t || "100";
  }
  /**
   * Updates the internal `_step` value and calculates the number of decimal places.
   * @param {string | null} val - The new step value.
   * @private
   */
  _updateStepValue(t) {
    this._step = t || "1", this._decimalPlaces = this._step.toString().split(".")[1]?.length.toString() || "0";
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
class d extends o {
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
customElements.define("aero-numeric-input", d);
const u = `<style>\r
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
class l extends o {
  /** @private */
  _boundDecrement = this.decrement.bind(this);
  /** @private */
  _boundIncrement = this.increment.bind(this);
  /**
   * The decrement button element.
   * @private
   */
  _$minus;
  /**
   * The increment button element.
   * @private
   */
  _$plus;
  /**
    * Observer to handle component resizing for layout adjustments.
    * @private
    */
  _resizeObserver;
  constructor() {
    super(u), this._$minus = this.query("#minus"), this._$plus = this.query("#plus"), this._updateButtonBackgrondColor(
      this.getAttribute("button-backgroundcolor")
    ), this._updateMinuxText(this.getAttribute("minus-text")), this._updatePlusText(this.getAttribute("plus-text")), this._updateHeight(parseInt(getComputedStyle(this).height)), this._resizeObserver = new ResizeObserver((t) => {
      for (const e of t) {
        const i = e.contentRect.height;
        this.applyStyles(
          `#spinbox {
						grid-template-columns: ${i}px 1fr ${i}px;
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
  getInputSelector() {
    return "#input";
  }
  /**
    * Lifecycle callback: Invoked when the component is added to the DOM.
    * Sets up event listeners and observers.
    * @returns {void}
    */
  connectedCallback() {
    this._$minus.addEventListener("click", this._boundDecrement), this._$plus.addEventListener("click", this._boundIncrement), this._resizeObserver.observe(this);
  }
  /**
    * Lifecycle callback: Invoked when the component is removed from the DOM.
    * Cleans up event listeners and observers to prevent memory leaks.
    * @returns {void}
    */
  disconnectedCallback() {
    this._$minus.removeEventListener("click", this._boundDecrement), this._$plus.removeEventListener("click", this._boundIncrement), this._resizeObserver.disconnect();
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
    super.attributeChangedCallback(t, e, i), this._aeroSpinboxAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions for this component.
   * @private
   */
  _aeroSpinboxAttributeHandlers = {
    "minus-text": (t) => {
      this._updateMinuxText(t);
    },
    "plus-text": (t) => {
      this._updatePlusText(t);
    },
    "button-backgroundcolor": (t) => {
      this._updateButtonBackgrondColor(t);
    }
  };
  /**
   * Updates the text content of the decrement button.
   * @param {string | null} val - The new text.
   * @private
   */
  _updateMinuxText(t) {
    this._$minus.textContent = t || "-";
  }
  /**
   * Updates the text content of the increment button.
   * @param {string | null} val - The new text.
   * @private
   */
  _updatePlusText(t) {
    this._$plus.textContent = t || "+";
  }
  /**
   * Updates the background color of the buttons.
   * @param {string | null} val - The new color.
   * @private
   */
  _updateButtonBackgrondColor(t) {
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
  _updateHeight(t) {
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
const c = `<style>\r
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
class p extends s {
  constructor() {
    super(c), this._updateSpinnerStyles();
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
    this._updateSpinnerStyles();
  }
  /**
   * Updates the spinner's styles based on its current attributes.
   * Using :host instead of an inner element means styles are applied to the custom element itself.
   * Re-appending styles multiple times can cause conflicts or unexpected behavior.
   * @private
   */
  _updateSpinnerStyles() {
    const t = this.getAttribute("width") || "50", e = this.getAttribute("height") || "50", i = this.getAttribute("background") || "white", n = this.getAttribute("color") || "black", a = this.getAttribute("cycle") || "1";
    this.applyStyles(`
			:host {
				width: ${t}px;
				height: ${e}px;
				border: 5px solid ${i};
				border-top-color: ${n};
				border-radius: 50%;
				animation: spin ${a}s linear infinite;
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
customElements.define("aero-progress-spinner", p);
const g = `<style>\r
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
class b extends s {
  _$topResizer;
  _$bottomResizer;
  _$leftResizer;
  _$rightResizer;
  _nMinWidth;
  _nMaxWidth;
  _nMinHeight;
  _nMaxHeight;
  _isTopDragging = !1;
  _isBottomDragging = !1;
  _isLeftDragging = !1;
  _isRightDragging = !1;
  _isDragging = !1;
  _animationFrameId = null;
  _resizerHandlers = {
    top: (t) => this._processMousedownEvent(t, "top"),
    bottom: (t) => this._processMousedownEvent(t, "bottom"),
    left: (t) => this._processMousedownEvent(t, "left"),
    right: (t) => this._processMousedownEvent(t, "right")
  };
  constructor() {
    super(g), this._$topResizer = this.query("#top"), this._$bottomResizer = this.query("#bottom"), this._$leftResizer = this.query("#left"), this._$rightResizer = this.query("#right"), this._updateMinWidthValue(this.getAttribute("min-width")), this._updateMaxWidthValue(this.getAttribute("max-width")), this._updateMinHeightValue(this.getAttribute("min-height")), this._updateMaxHeightValue(this.getAttribute("max-height"));
  }
  connectedCallback() {
    this._updateResizeState("top", this.hasAttribute("resize-top")), this._updateResizeState("bottom", this.hasAttribute("resize-bottom")), this._updateResizeState("left", this.hasAttribute("resize-left")), this._updateResizeState("right", this.hasAttribute("resize-right")), window.addEventListener("mousemove", this._handleMousemove), window.addEventListener("mouseup", this._handleMouseup);
  }
  disconnectedCallback() {
    this._updateResizeState("top", !1), this._updateResizeState("bottom", !1), this._updateResizeState("left", !1), this._updateResizeState("right", !1), window.removeEventListener("mousemove", this._handleMousemove), window.removeEventListener("mouseup", this._handleMouseup);
  }
  /**
   * Handles mouse move events to perform resizing.
   * @param {MouseEvent} e - The mouse event.
   * @private
   */
  _handleMousemove = (t) => {
    this._isDragging && (this._animationFrameId && cancelAnimationFrame(this._animationFrameId), this._animationFrameId = requestAnimationFrame(() => {
      const e = this.getBoundingClientRect();
      if (this._isTopDragging) {
        const i = e.bottom - t.clientY, n = Math.min(
          Math.max(i, this._nMinHeight),
          this._nMaxHeight
        );
        this.style.height = `${n}px`, this._emitResize(null, n);
      } else if (this._isBottomDragging) {
        const i = t.clientY - e.top, n = Math.min(
          Math.max(i, this._nMinHeight),
          this._nMaxHeight
        );
        this.style.height = `${n}px`, this._emitResize(null, n);
      } else if (this._isLeftDragging) {
        const i = e.right - t.clientX, n = Math.min(
          Math.max(i, this._nMinWidth),
          this._nMaxWidth
        );
        this.style.width = `${n}px`, this._emitResize(n, null);
      } else if (this._isRightDragging) {
        const i = t.clientX - e.left, n = Math.min(
          Math.max(i, this._nMinWidth),
          this._nMaxWidth
        );
        this.style.width = `${n}px`, this._emitResize(n, null);
      }
    }));
  };
  /**
   * Handles the mouseup event to finalize the resize operation.
   * @param {MouseEvent} e - The mouse event.
   * @private
   */
  _handleMouseup = (t) => {
    this._isDragging && (this.forwardCustomEvent("aero-resize-end", {
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight
      }
    }), this._animationFrameId && (cancelAnimationFrame(this._animationFrameId), this._animationFrameId = null), document.body.style.cursor = "", document.body.style.userSelect = "", this._isDragging = !1, this._isTopDragging = !1, this._isBottomDragging = !1, this._isLeftDragging = !1, this._isRightDragging = !1);
  };
  /**
   * Handles the mousedown event on a resizer element.
   * @param {MouseEvent} e - The mouse event.
   * @param {"top" | "bottom" | "left" | "right"} resizer - The resizer that was clicked.
   * @private
   */
  _processMousedownEvent = (t, e) => {
    switch (t.preventDefault(), document.body.style.userSelect = "none", this._isDragging = !0, this.forwardCustomEvent("aero-resize-start", {
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight,
        edge: e
      }
    }), e) {
      case "top":
        this._isTopDragging = !0, document.body.style.cursor = "ns-resize";
        break;
      case "bottom":
        this._isBottomDragging = !0, document.body.style.cursor = "ns-resize";
        break;
      case "left":
        this._isLeftDragging = !0, document.body.style.cursor = "ew-resize";
        break;
      case "right":
        this._isRightDragging = !0, document.body.style.cursor = "ew-resize";
        break;
    }
  };
  /**
   * Emits the 'aero-resize' custom event.
   * @param {number | null} width - The new width, or null if not changed.
   * @param {number | null} height - The new height, or null if not changed.
   * @private
   */
  _emitResize(t, e) {
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
    this._baseAeroResizeBoxAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions.
   * @private
   */
  _baseAeroResizeBoxAttributeHandlers = {
    "min-width": (t) => {
      this._updateMinWidthValue(t);
    },
    "max-width": (t) => {
      this._updateMaxWidthValue(t);
    },
    "min-height": (t) => {
      this._updateMinHeightValue(t);
    },
    "max-height": (t) => {
      this._updateMaxHeightValue(t);
    },
    "resize-top": (t) => {
      this._updateResizeState("top", t !== null);
    },
    "resize-bottom": (t) => {
      this._updateResizeState("bottom", t !== null);
    },
    "resize-left": (t) => {
      this._updateResizeState("left", t !== null);
    },
    "resize-right": (t) => {
      this._updateResizeState("right", t !== null);
    },
    "resizer-color": (t) => {
      const e = t ?? "#ccc";
      this.applyStyles(`.resizer:hover { background-color: ${e}; }`);
    }
  };
  /**
   * Enables or disables a resizer.
   * @param {"top" | "bottom" | "left" | "right"} direction - The resizer to update.
   * @param {boolean} enabled - Whether to enable or disable the resizer.
   * @private
   */
  _updateResizeState(t, e) {
    let i, n;
    switch (t) {
      case "top":
        i = this._$topResizer, n = this._resizerHandlers.top;
        break;
      case "bottom":
        i = this._$bottomResizer, n = this._resizerHandlers.bottom;
        break;
      case "left":
        i = this._$leftResizer, n = this._resizerHandlers.left;
        break;
      case "right":
        i = this._$rightResizer, n = this._resizerHandlers.right;
        break;
    }
    i.hidden = !e, e ? i.addEventListener("mousedown", n) : i.removeEventListener("mousedown", n);
  }
  /**
   * Updates the internal minimum width value.
   * @param {string | null} val - The new value.
   * @private
   */
  _updateMinWidthValue(t) {
    this._nMinWidth = t ? Number(t) : 0;
  }
  /**
   * Updates the internal maximum width value.
   * @param {string | null} val - The new value.
   * @private
   */
  _updateMaxWidthValue(t) {
    this._nMaxWidth = t ? Number(t) : 2e3;
  }
  /**
   * Updates the internal minimum height value.
   * @param {string | null} val - The new value.
   * @private
   */
  _updateMinHeightValue(t) {
    this._nMinHeight = t ? Number(t) : 0;
  }
  /**
   * Updates the internal maximum height value.
   * @param {string | null} val - The new value.
   * @private
   */
  _updateMaxHeightValue(t) {
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
customElements.define("aero-resizable-box", b);
const _ = `<style>\r
	:host {\r
		--aero-select-width: 150px;\r
		--aero-select-height: 36px;\r
\r
		--aero-select-font-size: 16px;\r
		--aero-select-font-family: san-serif;\r
\r
		--aero-select-border: 1px solid #000;\r
\r
		--aero-select-dropdown-border: 1px solid #000;\r
		--aero-select-dropdown-z-index: 100;\r
		--aero-select-dropdown-item-border: 1px solid grey;\r
		--aero-select-dropdown-item-background: #fff;\r
		--aero-select-dropdown-item-color: #000;\r
\r
		--aero-select-dropdown-hover-item-border: 1px solid grey;\r
		--aero-select-dropdown-hover-item-background: #000;\r
		--aero-select-dropdown-hover-item-color: white;\r
		--aero-select-dropdown-hover-item-cursor: pointer;\r
\r
		--aero-select-span-background: transparent;\r
		--aero-select-span-border: 1px solid transparent;\r
\r
		--aero-select-button-border: 1px solid #000;\r
		--aero-select-button-background: lightgrey;\r
		--aero-select-button-color: #000;\r
\r
		--aero-select-button-hover-border: 1px solid #000;\r
		--aero-select-button-hover-background: grey;\r
		--aero-select-button-hover-color: #000;\r
		--aero-select-button-hover-cursor: pointer;\r
\r
		display: block;\r
\r
		width: var(--aero-select-width);\r
		height: var(--aero-select-height);\r
\r
		font-size: var(--aero-select-font-size);\r
		font-family: var(--aero-select-font-family);\r
	}\r
\r
	::slotted(*) {\r
    display: grid;\r
    grid-template-columns: 1fr auto;\r
\r
    text-align: center;\r
		line-height: var(--aero-select-height);\r
\r
		border-bottom: var(--aero-select-dropdown-item-border);\r
		background-color: var(--aero-select-dropdown-item-background);\r
		color: var(--aero-select-dropdown-item-color);\r
	}\r
\r
	::slotted(*.highlight),\r
	::slotted(*:hover) {\r
		border-bottom: var(--aero-select-dropdown-hover-item-border);\r
		background-color: var(--aero-select-dropdown-hover-item-background);\r
		color: var(--aero-select-dropdown-hover-item-color);\r
		cursor: var(--aero-select-dropdown-hover-item-cursor);\r
	}\r
\r
	::slotted(*:last-child) {\r
		border-bottom: none;\r
	}\r
\r
	::slotted(*)::after {\r
		content: '';\r
		aspect-ratio: 1 / 1;\r
	}\r
\r
	#overlay {\r
		position: relative;\r
\r
		width: 100%;\r
    height: 100%;\r
	}\r
\r
	#container {\r
		width: 100%;\r
		height: 100%;\r
\r
		display: grid;\r
		grid-template-columns: 1fr auto;\r
\r
		border: var(--aero-select-border);\r
		box-sizing: border-box;\r
	}\r
\r
	#span,\r
	#button {\r
		padding: 0;\r
		margin: 0;\r
	}\r
\r
	#span {\r
		display: flex;\r
		justify-content: center;\r
		align-items: center;\r
\r
		background-color: var(--aero-select-span-background);\r
\r
		border: var(--aero-select-span-border);\r
		box-sizing: border-box;\r
	}\r
\r
	#span:hover {\r
		cursor: default;\r
	}\r
\r
	#button {\r
    aspect-ratio: 1 / 1;\r
\r
		border: var(--aero-select-button-border);\r
		background-color: var(--aero-select-button-background);\r
		color: var(--aero-select-button-color);\r
	}\r
\r
	#button:hover {\r
		border: var(--aero-select-button-hover-border);\r
		background-color: var(--aero-select-button-hover-background);\r
		color: var(--aero-select-button-hover-color);\r
		cursor: var(--aero-select-button-hover-cursor);\r
	}\r
\r
	#dropdown {\r
		position: absolute;\r
		width: 100%;\r
		display: none;\r
		border: var(--aero-select-dropdown-border);\r
		box-sizing: border-box;\r
		z-index: var(--aero-select-dropdown-z-index);\r
	}\r
\r
	#dropdown.open {\r
		display: block;\r
	}\r
</style>\r
\r
<div id="overlay">\r
	<div id="container">\r
		<span id="span"></span>\r
		<button id="button"></button>\r
	</div>\r
	<div id="dropdown">\r
		<slot></slot>\r
	</div>\r
</div>\r
`;
class m extends s {
  /** @private */
  _handlers = {
    documentClick: this._handleDocumentClick.bind(this),
    buttonClick: this._handleButtonClick.bind(this),
    dropdownClick: this._handleDropdownClick.bind(this),
    slotChange: this._handleSlotChange.bind(this),
    keydown: this._handleKeydown.bind(this)
  };
  /**
   * The `<span>` element displaying the currently selected option's text.
   * @private
   */
  _$span;
  /**
   * The button element that toggles the dropdown.
   * @private
   */
  _$button;
  /**
   * The dropdown container element.
   * @private
   */
  _$dropdown;
  /**
   * An array of `<aero-option>` elements assigned to the slot.
   * @private
   */
  _$options = [];
  /**
   * The index of the currently selected option.
   * @private
   */
  _optionIndex = -1;
  /**
   * Indicates whether the dropdown is currently open.
   * @private
   */
  _dropdown_open = !1;
  /**
   * The slot element that holds the `<aero-option>` elements.
   * @private
   */
  _$slot;
  /**
   * The index of the currently highlighted option (for keyboard navigation).
   * @private
   */
  _highlightIndex = -1;
  /**
   * A temporary store for the option index if it's set before the options are ready.
   * @private
   */
  _pendingOptionIndex;
  constructor() {
    super(_), this._$span = this.query("#span"), this._$button = this.query("#button"), this._$dropdown = this.query("#dropdown"), this._$slot = this.query("slot"), this._$options = (this._$slot?.assignedElements() ?? []).filter(
      (t) => t instanceof HTMLElement
    ), this._$button.textContent = this.getAttribute("button-text") ?? "▽", this._updateOptionIndex(
      this._getValidateOptionIndexByStr(
        this.getAttribute("option-index") ?? "0"
      )
    );
  }
  /**
   * Lifecycle callback: Invoked when the component is added to the DOM.
   * Sets up event listeners.
   * @returns {void}
   */
  connectedCallback() {
    document.addEventListener("click", this._handlers.documentClick), this._$button.addEventListener("click", this._handlers.buttonClick), this._$dropdown.addEventListener("click", this._handlers.dropdownClick), this._$slot?.addEventListener("slotchange", this._handlers.slotChange), this.addEventListener("keydown", this._handlers.keydown);
  }
  /**
   * Lifecycle callback: Invoked when the component is removed from the DOM.
   * Cleans up event listeners to prevent memory leaks.
   * @returns {void}
   */
  disconnectedCallback() {
    document.removeEventListener("click", this._handlers.documentClick), this._$button.removeEventListener("click", this._handlers.buttonClick), this._$dropdown.removeEventListener("click", this._handlers.dropdownClick), this._$slot?.removeEventListener("slotchange", this._handlers.slotChange), this.removeEventListener("keydown", this._handlers.keydown);
  }
  /**
   * Handles clicks anywhere on the document to close the dropdown if open.
   * @private
   * @param {MouseEvent} [e] - The mouse event.
   * @returns {void}
   */
  _handleDocumentClick(t) {
    this._dropdown_open && t?.target !== this && (this._$dropdown.classList.remove("open"), this._dropdown_open = !1);
  }
  /**
   * Handles clicks on the dropdown toggle button.
   * @private
   * @param {MouseEvent} e - The mouse event.
   * @returns {void}
   */
  _handleButtonClick(t) {
    t.stopPropagation(), this._$dropdown.classList.toggle("open"), this._dropdown_open = !this._dropdown_open;
  }
  /**
   * Handles clicks within the dropdown menu.
   * @private
   * @param {MouseEvent} e - The mouse event.
   * @returns {void}
   */
  _handleDropdownClick(t) {
    const e = t.composedPath().find(
      (n) => n instanceof HTMLElement && this._$options.includes(n)
    );
    if (!e) return;
    const i = this._$options.indexOf(e);
    this.optionIndex = i, this._$dropdown.classList.remove("open"), this._dropdown_open = !1;
  }
  /**
   * Handles changes to the slotted `<aero-option>` elements.
   * @private
   * @returns {void}
   */
  _handleSlotChange() {
    const t = this._$options[this._optionIndex];
    if (this._$options = this._$slot.assignedElements().filter((e) => e instanceof HTMLElement), this._pendingOptionIndex !== void 0) {
      const e = this._pendingOptionIndex;
      this._pendingOptionIndex = void 0, this.optionIndex = e;
    } else
      this.optionIndex = this._$options.findIndex((e) => e === t);
  }
  /**
   * Handles keyboard navigation within the select component.
   * @private
   * @param {KeyboardEvent} e - The keyboard event.
   * @returns {void}
   */
  _handleKeydown(t) {
    if (t.key === "Enter" || t.key === " ")
      if (t.preventDefault(), !this._dropdown_open)
        this._$button.click();
      else {
        const e = this._$options[this._highlightIndex];
        e && (e.classList.remove("highlight"), this.optionIndex = this._highlightIndex), this._highlightIndex = -1, this._$button.click();
      }
    if (t.key === "ArrowDown" || t.key === "ArrowUp") {
      if (t.preventDefault(), !this._dropdown_open || t.key === "ArrowDown" && this._highlightIndex + 1 === this._$options.length || t.key === "ArrowUp" && this._highlightIndex === -1) return;
      this._$options[this._highlightIndex]?.classList.remove("highlight"), this._highlightIndex = t.key === "ArrowDown" ? this._highlightIndex + 1 : this._highlightIndex - 1, this._$options[this._highlightIndex]?.classList.add("highlight"), this._$options[this._highlightIndex]?.scrollIntoView({ block: "nearest" });
    }
    t.key === "Escape" && this._dropdown_open && (this._$button.click(), this._highlightIndex = -1);
  }
  /**
   * Specifies the observed attributes for the custom element.
   * @returns {string[]} An array of attribute names to observe.
   */
  static get observedAttributes() {
    return ["option-index"];
  }
  /**
   * Called when an observed attribute has been added, removed, or changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string | null} _oldValue - The old value of the attribute.
   * @param {string | null} newValue - The new value of the attribute.
   * @returns {void}
   */
  attributeChangedCallback(t, e, i) {
    this._aeroSelectAttributeHandlers[t]?.(i);
  }
  /**
   * A map of attribute names to their respective handler functions for this component.
   * @private
   */
  _aeroSelectAttributeHandlers = {
    "option-index": (t) => {
      this._updateOptionIndex(
        this._getValidateOptionIndexByStr(t ?? "")
      );
    }
  };
  /**
   * The zero-based index of the currently selected option.
   * Setting this property will update the displayed value and fire the `aero-select-changed` event.
   * @type {number}
   * @attr option-index
   * @default -1
   */
  get optionIndex() {
    return this._optionIndex;
  }
  set optionIndex(t) {
    this.setAttribute("option-index", t.toString());
  }
  /**
   * Updates the currently selected option based on the provided index.
   * @private
   * @param {number} index - The index of the option to select.
   * @returns {void}
   */
  _updateOptionIndex(t) {
    if (this._optionIndex === t) return;
    if (t < 0) {
      this._unsetOption();
      return;
    }
    const e = this._$options[t];
    if (!e) {
      this._pendingOptionIndex = t;
      return;
    }
    this._optionIndex = t, this._$span.textContent = e.textContent, this.forwardCustomEvent("aero-select-changed", {
      detail: {
        option: e,
        index: t
      }
    }), this._pendingOptionIndex = void 0;
  }
  /**
   * Validates and converts a string to a numeric option index.
   * @private
   * @param {string} index - The string representation of the index.
   * @returns {number} The validated numeric index, or -1 if invalid.
   */
  _getValidateOptionIndexByStr(t) {
    if (t === "") return -1;
    const e = Number(t);
    return Number.isNaN(e) ? -1 : e;
  }
  /**
   * Resets the select component to an unselected state.
   * @private
   * @returns {void}
   */
  _unsetOption() {
    this._optionIndex = -1, this._$span.textContent = "";
  }
}
customElements.define("aero-select", m);
class v extends HTMLElement {
  constructor() {
    super();
  }
  /**
   * The value associated with this option, similar to the `value` attribute on a standard `<option>`.
   * @type {string}
   * @attr value
   */
  get value() {
    return this.getAttribute("value") ?? "";
  }
  set value(t) {
    this.setAttribute("value", t);
  }
  /**
   * The visible text label of the option. This is typically the text content of the element.
   * @type {string}
   */
  get label() {
    return this.textContent ?? "";
  }
}
customElements.define("aero-option", v);
export {
  d as AeroNumericInput,
  v as AeroOption,
  p as AeroProgressSpinner,
  b as AeroResizableBox,
  m as AeroSelect,
  l as AeroSpinbox
};
