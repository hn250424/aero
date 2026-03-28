class a extends HTMLElement {
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
  query(t) {
    return this.shadow.querySelector(t);
  }
  queryOptional(t) {
    return this.shadow.querySelector(t);
  }
  // Applies a string of CSS to the shadow DOM by creating and appending a `<style>` tag.
  applyStyles(t, e = "component-styles") {
    let i = this.shadow.querySelector(`#${e}`);
    i || (i = document.createElement("style"), i.id = e, this.shadow.appendChild(i)), i.textContent = t;
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
      new CustomEvent(t, {
        detail: e?.detail,
        bubbles: !0,
        composed: !0
      })
    );
  }
  addEventListener(t, e, i) {
    super.addEventListener(t, e, i);
  }
  removeEventListener(t, e, i) {
    super.removeEventListener(t, e, i);
  }
}
class p extends a {
  _boundDispatchInputEvent = this._dispatchInputEvent.bind(this);
  _boundDispatchChangeEvent = this._dispatchChangeEvent.bind(this);
  _boundDispatchFocusinEvent = this._dispatchFocusinEvent.bind(this);
  _boundDispatchFocusoutEvent = this._dispatchFocusoutEvent.bind(this);
  _$input;
  constructor(t) {
    super(t), this._initializeInput(), this._syncUI(this.getAttribute("value"));
  }
  _initializeInput() {
    this._$input = this.query(this.getInputSelector());
  }
  getValidateValue(t) {
    const e = isNaN(t) ? this.min : t, n = Math.max(this.min, Math.min(this.max, e)) - this.min, r = Math.round(n / this.step) * this.step;
    let s = this.min + r;
    return s > this.max && (s = s - this.step), Number(s.toFixed(this.decimalPlaces));
  }
  connectedCallback() {
    this._$input.addEventListener("input", this._boundDispatchInputEvent), this._$input.addEventListener("change", this._boundDispatchChangeEvent), this._$input.addEventListener("focusin", this._boundDispatchFocusinEvent), this._$input.addEventListener("focusout", this._boundDispatchFocusoutEvent);
  }
  disconnectedCallback() {
    this._$input.removeEventListener("input", this._boundDispatchInputEvent), this._$input.removeEventListener("change", this._boundDispatchChangeEvent), this._$input.removeEventListener(
      "focusin",
      this._boundDispatchFocusinEvent
    ), this._$input.removeEventListener(
      "focusout",
      this._boundDispatchFocusoutEvent
    );
  }
  _dispatchInputEvent(t) {
    t.stopImmediatePropagation(), this.forwardNativeEvent("input");
  }
  _dispatchChangeEvent(t) {
    t.stopImmediatePropagation();
    const e = this.getValidateValue(this._$input.valueAsNumber);
    this.value = e, this.forwardNativeEvent("change");
  }
  _dispatchFocusinEvent(t) {
    t.stopImmediatePropagation(), this.forwardNativeEvent("focusin");
  }
  _dispatchFocusoutEvent(t) {
    t.stopImmediatePropagation();
    const e = this.getValidateValue(this._$input.valueAsNumber);
    this.value = e, this.forwardNativeEvent("focusout");
  }
  static get observedAttributes() {
    return ["value", "min", "max", "step"];
  }
  attributeChangedCallback(t, e, i) {
    this._baseAeroNumericInputAttributeHandlers[t]?.(i);
  }
  _baseAeroNumericInputAttributeHandlers = {
    value: (t) => {
      this._syncUI(t);
    },
    min: () => {
      this.value = this.value;
    },
    max: () => {
      this.value = this.value;
    },
    step: () => {
      this.value = this.value;
    }
  };
  _syncUI(t) {
    t && (this._$input.value = t);
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
    const t = this.getAttribute("value");
    return t === null ? this.min : Number(t);
  }
  set value(t) {
    const e = this.getValidateValue(t);
    this.setAttribute("value", String(e));
  }
  /**
   * The minimum allowed value.
   * @type {number}
   * @attr
   * @default 0
   */
  get min() {
    const t = this.getAttribute("min");
    return t === null || isNaN(Number(t)) ? 0 : Number(t);
  }
  set min(t) {
    this.setAttribute("min", String(t));
  }
  /**
   * The maximum allowed value.
   * @type {number}
   * @attr
   * @default 100
   */
  get max() {
    const t = this.getAttribute("max");
    return t === null || isNaN(Number(t)) ? 100 : Number(t);
  }
  set max(t) {
    this.setAttribute("max", String(t));
  }
  /**
   * The stepping interval for the numeric input.
   * @type {number}
   * @attr
   * @default 1
   */
  get step() {
    const t = this.getAttribute("step"), e = Number(t);
    return t === null || isNaN(e) || e <= 0 ? 1 : e;
  }
  set step(t) {
    this.setAttribute("step", String(t));
  }
  // The number of decimal places, derived from the `step` attribute.
  get decimalPlaces() {
    const t = this.getAttribute("step");
    if (!t || isNaN(Number(t))) return 0;
    const e = t?.split(".");
    return e?.length > 1 ? e[1].length : 0;
  }
}
const v = `<style>\r
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
class x extends p {
  constructor() {
    super(v);
  }
  getInputSelector() {
    return "#input";
  }
}
customElements.define("aero-numeric-input", x);
const f = `<style>\r
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
		background-color: var(--aero-spinbox-button-background, lightgrey);\r
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
class w extends p {
  _boundDecrement = this.decrement.bind(this);
  _boundIncrement = this.increment.bind(this);
  _$minus;
  _$plus;
  _resizeObserver;
  constructor() {
    super(f), this._$minus = this.query("#minus"), this._$plus = this.query("#plus"), this._updateMinuxText(this.getAttribute("minus-text")), this._updatePlusText(this.getAttribute("plus-text")), this._updateHeight(parseInt(getComputedStyle(this).height)), this._resizeObserver = new ResizeObserver((t) => {
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
  getInputSelector() {
    return "#input";
  }
  connectedCallback() {
    this._$minus.addEventListener("click", this._boundDecrement), this._$plus.addEventListener("click", this._boundIncrement), this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._$minus.removeEventListener("click", this._boundDecrement), this._$plus.removeEventListener("click", this._boundIncrement), this._resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "minus-text",
      "plus-text"
    ];
  }
  attributeChangedCallback(t, e, i) {
    super.attributeChangedCallback(t, e, i), this._aeroSpinboxAttributeHandlers[t]?.(i);
  }
  _aeroSpinboxAttributeHandlers = {
    "minus-text": (t) => {
      this._updateMinuxText(t);
    },
    "plus-text": (t) => {
      this._updatePlusText(t);
    }
  };
  _updateMinuxText(t) {
    this._$minus.textContent = t || "-";
  }
  _updatePlusText(t) {
    this._$plus.textContent = t || "+";
  }
  _updateHeight(t) {
    t = t || 30, this.applyStyles(
      `#spinbox {
				grid-template-columns: ${t}px 1fr ${t}px;
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
    const t = this.value - this.step;
    this.value = this.getValidateValue(t);
  }
  /**
   * Increments the input value by the step amount.
   */
  increment() {
    const t = this.value + this.step;
    this.value = this.getValidateValue(t);
  }
}
customElements.define("aero-spinbox", w);
const y = `<style>\r
	:host {\r
		display: block;\r
	}\r
</style>\r
`;
class $ extends a {
  _size;
  _thickness;
  _radius;
  _circumference;
  _trackColor;
  _arcColor;
  _cycle;
  _arcRatio;
  _$svg;
  _$track;
  _$arc;
  constructor() {
    super(y), this._syncHostAttributes(), this._buildSvg(), this._syncSvgAttributes(), this._syncStyles();
  }
  _buildSvg() {
    const t = "http://www.w3.org/2000/svg";
    this._$svg = document.createElementNS(t, "svg"), this._$track = document.createElementNS(t, "circle"), this._$arc = document.createElementNS(t, "circle"), this._$track.classList.add("track"), this._$arc.classList.add("arc"), this._$svg.appendChild(this._$track), this._$svg.appendChild(this._$arc), this.shadow.appendChild(this._$svg);
  }
  static get observedAttributes() {
    return ["size", "thickness", "track-color", "arc-color", "cycle", "arc-ratio"];
  }
  attributeChangedCallback(t, e, i) {
    this._syncHostAttributes(), this._syncSvgAttributes(), this._syncStyles();
  }
  _syncHostAttributes() {
    this._size = parseInt(this.getAttribute("size") || "50"), this._thickness = parseInt(this.getAttribute("thickness") || "4"), this._radius = this._size / 2 - this._thickness - 1, this._circumference = 2 * Math.PI * this._radius, this._trackColor = this.getAttribute("track-color") || "transparent", this._arcColor = this.getAttribute("arc-color") || "black", this._cycle = parseInt(this.getAttribute("cycle") || "2"), this._arcRatio = parseFloat(this.getAttribute("arc-ratio") || "90") / 100;
  }
  _syncSvgAttributes() {
    this._$svg.setAttribute("viewBox", `0 0 ${this._size} ${this._size}`), this._$svg.setAttribute("width", String(this._size)), this._$svg.setAttribute("height", String(this._size)), this._$track.setAttribute("cx", String(this._size / 2)), this._$track.setAttribute("cy", String(this._size / 2)), this._$track.setAttribute("r", String(this._radius)), this._$arc.setAttribute("cx", String(this._size / 2)), this._$arc.setAttribute("cy", String(this._size / 2)), this._$arc.setAttribute("r", String(this._radius));
  }
  _syncStyles() {
    this.applyStyles(`
			:host {
				width: ${this._size}px;
				height: ${this._size}px;
			}

			.track {
				fill: none;
				stroke: ${this._trackColor};
				stroke-width: ${this._thickness};
			}

			.arc {
				fill: none;
				stroke: ${this._arcColor};
				stroke-width: ${this._thickness};

				stroke-dasharray: ${this._circumference};
				stroke-dashoffset: ${this._circumference};

				transform-origin: center;

				animation:
					spin ${this._cycle}s linear infinite,
					arc ${this._cycle}s ease-in-out infinite;
			}

			@keyframes spin {
				to {
					transform: rotate(360deg);
				}
			}

			@keyframes arc {
				0% {
					stroke-dasharray: 10 ${this._circumference - 10};
					stroke-dashoffset: 0;
				}
				50% {
					stroke-dasharray: ${this._circumference * this._arcRatio} ${this._circumference - this._circumference * this._arcRatio};
					stroke-dashoffset: 0;
				}
				100% {
					stroke-dasharray: 10 ${this._circumference - 10};
					stroke-dashoffset: ${this._circumference * -1};
				}
			}
		`);
  }
}
customElements.define(
  "aero-indeterminate-spinner",
  $
);
const k = `<style>\r
	:host {\r
		position: relative;\r
		display: block;\r
		width: 300px;\r
		height: 300px;\r
		border: 1px solid lightgray;\r
		box-sizing: border-box;\r
	}\r
\r
	.resizer {\r
		position: absolute;\r
		background-color: transparent;\r
		transition: background-color 0.3s ease;\r
	}\r
\r
	.resizer:hover {\r
		background-color: var(--aero-resizable-box-resizer-color, grey);\r
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
		transform: translateY(-50%);\r
	}\r
\r
	#bottom {\r
		left: 0;\r
		bottom: 0;\r
		transform: translateY(50%);\r
	}\r
\r
	#left {\r
		top: 0;\r
		left: 0;\r
		transform: translateX(-50%);\r
	}\r
\r
	#right {\r
		top: 0;\r
		right: 0;\r
		transform: translateX(50%);\r
	}\r
</style>\r
\r
<slot></slot>\r
<div id="top" class="resizer vertical"></div>\r
<div id="bottom" class="resizer vertical"></div>\r
<div id="left" class="resizer horizontal"></div>\r
<div id="right" class="resizer horizontal"></div>\r
`;
class d extends a {
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
    super(k), this._$topResizer = this.query("#top"), this._$bottomResizer = this.query("#bottom"), this._$leftResizer = this.query("#left"), this._$rightResizer = this.query("#right"), this._updateMinWidthValue(this.getAttribute("min-width")), this._updateMaxWidthValue(this.getAttribute("max-width")), this._updateMinHeightValue(this.getAttribute("min-height")), this._updateMaxHeightValue(this.getAttribute("max-height")), this._initializeAttributes();
  }
  _initializeAttributes() {
    d.observedAttributes.forEach((t) => {
      const e = this.getAttribute(t);
      this._baseAeroResizeBoxAttributeHandlers[t]?.(e);
    });
  }
  connectedCallback() {
    this._updateResizeState("top", this.hasAttribute("resize-top")), this._updateResizeState("bottom", this.hasAttribute("resize-bottom")), this._updateResizeState("left", this.hasAttribute("resize-left")), this._updateResizeState("right", this.hasAttribute("resize-right")), window.addEventListener("mousemove", this._handleMousemove), window.addEventListener("mouseup", this._handleMouseup);
  }
  disconnectedCallback() {
    this._updateResizeState("top", !1), this._updateResizeState("bottom", !1), this._updateResizeState("left", !1), this._updateResizeState("right", !1), window.removeEventListener("mousemove", this._handleMousemove), window.removeEventListener("mouseup", this._handleMouseup);
  }
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
  _handleMouseup = (t) => {
    this._isDragging && (this.forwardCustomEvent("aero-resize-end", {
      detail: {
        width: this.offsetWidth,
        height: this.offsetHeight
      }
    }), this._animationFrameId && (cancelAnimationFrame(this._animationFrameId), this._animationFrameId = null), document.body.style.cursor = "", document.body.style.userSelect = "", this._isDragging = !1, this._isTopDragging = !1, this._isBottomDragging = !1, this._isLeftDragging = !1, this._isRightDragging = !1);
  };
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
  _emitResize(t, e) {
    this.forwardCustomEvent("aero-resize", {
      detail: {
        width: t,
        height: e
      }
    });
  }
  static get observedAttributes() {
    return [
      "min-width",
      "max-width",
      "min-height",
      "max-height",
      "resize-top",
      "resize-bottom",
      "resize-left",
      "resize-right"
    ];
  }
  attributeChangedCallback(t, e, i) {
    this._baseAeroResizeBoxAttributeHandlers[t]?.(i);
  }
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
    }
  };
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
  _updateMinWidthValue(t) {
    this._nMinWidth = t ? Number(t) : 0;
  }
  _updateMaxWidthValue(t) {
    this._nMaxWidth = t ? Number(t) : 2e3;
  }
  _updateMinHeightValue(t) {
    this._nMinHeight = t ? Number(t) : 0;
  }
  _updateMaxHeightValue(t) {
    this._nMaxHeight = t ? Number(t) : 2e3;
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
customElements.define("aero-resizable-box", d);
const z = `<style>\r
	:host {\r
		--aero-select-width: 100%;\r
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
		width: var(--aero-select-width, 100%);\r
		height: var(--aero-select-height, 36px);\r
\r
		font-size: var(--aero-select-font-size);\r
		font-family: var(--aero-select-font-family);\r
	}\r
\r
	::slotted(*) {\r
    display: grid;\r
    grid-template-columns: 1fr var(--aero-select-height, 36px);\r
		height: var(--aero-select-height, 36px);\r
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
		position: fixed;\r
		z-index: var(--aero-select-dropdown-z-index);\r
\r
		max-height: calc(var(--aero-select-height, 36px) * 6.5);\r
		overflow-y: auto;\r
\r
		display: none;\r
\r
		border: var(--aero-select-dropdown-border);\r
		box-sizing: border-box;\r
\r
		scrollbar-width: thin;\r
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
class A extends a {
  _handlers = {
    documentClick: this._handleDocumentClick.bind(this),
    buttonClick: this._handleButtonClick.bind(this),
    dropdownClick: this._handleDropdownClick.bind(this),
    slotChange: this._handleSlotChange.bind(this),
    keydown: this._handleKeydown.bind(this)
  };
  _$span;
  _$button;
  _$dropdown;
  _$options = [];
  _optionIndex = -1;
  _dropdown_open = !1;
  _$slot;
  _highlightIndex = -1;
  _pendingOptionIndex;
  constructor() {
    super(z), this._$span = this.query("#span"), this._$button = this.query("#button"), this._$dropdown = this.query("#dropdown"), this._$slot = this.query("slot"), this._$options = (this._$slot?.assignedElements() ?? []).filter(
      (t) => t instanceof HTMLElement
    ), this._$button.textContent = this.getAttribute("button-text") ?? "▽", this._updateOptionIndex(
      this._getValidateOptionIndexByStr(
        this.getAttribute("option-index") ?? "-1"
      )
    );
  }
  connectedCallback() {
    document.addEventListener("click", this._handlers.documentClick), this._$button.addEventListener("click", this._handlers.buttonClick), this._$dropdown.addEventListener("click", this._handlers.dropdownClick), this._$slot?.addEventListener("slotchange", this._handlers.slotChange), this.addEventListener("keydown", this._handlers.keydown);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._handlers.documentClick), this._$button.removeEventListener("click", this._handlers.buttonClick), this._$dropdown.removeEventListener("click", this._handlers.dropdownClick), this._$slot?.removeEventListener("slotchange", this._handlers.slotChange), this.removeEventListener("keydown", this._handlers.keydown);
  }
  _handleDocumentClick(t) {
    this._dropdown_open && (this._closeDropdown(), this._dropdown_open = !1);
  }
  _handleButtonClick(t) {
    t.stopPropagation(), this._dropdown_open = !this._dropdown_open, this._dropdown_open ? this._openDropdown() : this._closeDropdown();
  }
  _openDropdown() {
    const t = this.getBoundingClientRect(), e = this._$dropdown.offsetHeight || parseInt(getComputedStyle(this).getPropertyValue("--aero-select-height")) * 6.5, i = window.innerHeight - t.bottom, n = t.top;
    let r = !1;
    i < e && n > i && (r = !0), this._$dropdown.style.left = `${t.left}px`, this._$dropdown.style.width = `${t.width}px`, r ? (this._$dropdown.style.top = `${t.top - e}px`, this._$dropdown.classList.add("open-up"), this._$dropdown.classList.remove("open-down")) : (this._$dropdown.style.top = `${t.bottom}px`, this._$dropdown.classList.add("open-down"), this._$dropdown.classList.remove("open-up")), this._$dropdown.classList.add("open"), window.addEventListener(
      "scroll",
      this._handlers.documentClick,
      { capture: !0, passive: !0 }
    ), window.addEventListener(
      "resize",
      this._handlers.documentClick
    );
  }
  _closeDropdown() {
    this._$dropdown.classList.remove("open", "open-up", "open-down"), window.removeEventListener(
      "scroll",
      this._handlers.documentClick,
      { capture: !0 }
    ), window.removeEventListener(
      "resize",
      this._handlers.documentClick
    );
  }
  _handleDropdownClick(t) {
    const e = t.composedPath().find(
      (n) => n instanceof HTMLElement && this._$options.includes(n)
    );
    if (!e) return;
    const i = this._$options.indexOf(e);
    this.optionIndex = i, this._closeDropdown(), this._dropdown_open = !1;
  }
  _handleSlotChange() {
    const t = this._$options[this._optionIndex];
    if (this._$options = this._$slot.assignedElements().filter((e) => e instanceof HTMLElement), this._pendingOptionIndex !== void 0) {
      const e = this._pendingOptionIndex;
      this._pendingOptionIndex = void 0, this.optionIndex = e;
    } else
      this.optionIndex = this._$options.findIndex((e) => e === t);
  }
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
  static get observedAttributes() {
    return ["option-index"];
  }
  attributeChangedCallback(t, e, i) {
    this._aeroSelectAttributeHandlers[t]?.(i);
  }
  _aeroSelectAttributeHandlers = {
    "option-index": (t) => {
      this._updateOptionIndex(this._getValidateOptionIndexByStr(t ?? ""));
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
  _getValidateOptionIndexByStr(t) {
    if (t === "") return -1;
    const e = Number(t);
    return Number.isNaN(e) ? -1 : e;
  }
  _unsetOption() {
    this._optionIndex = -1, this._$span.textContent = "";
  }
}
customElements.define("aero-select", A);
class E extends HTMLElement {
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
customElements.define("aero-option", E);
const C = `<style>\r
	:host {\r
		position: fixed;\r
\r
		top: 90%;\r
		left: 50%;\r
\r
		transform: translate(-50%, 10px);\r
		opacity: 0;\r
\r
		animation: toast-fade linear forwards;\r
\r
		padding: 5px 10px;\r
		border-radius: 5%;\r
	}\r
\r
	#text {\r
	}\r
\r
	@keyframes toast-fade {\r
		0% {\r
			transform: translate(-50%, 10px);\r
			opacity: 0;\r
		}\r
		10% {\r
			transform: translate(-50%, 0);\r
			opacity: 1;\r
		}\r
		90% {\r
			transform: translate(-50%, 0);\r
			opacity: 1;\r
		}\r
		100% {\r
			transform: translate(-50%, 10px);\r
			opacity: 0;\r
		}\r
	}\r
</style>\r
\r
<span id="text"></span>\r
`, I = {
  top: "90%",
  left: "50%",
  ms: 3e3,
  background: "black",
  color: "white"
};
class l extends a {
  _$text;
  constructor(t, e) {
    super(C);
    const { top: i, left: n, ms: r, background: s, color: h } = e;
    this._$text = this.query("#text"), this._$text.textContent = t, this.applyStyles(`
			:host {
				top: ${i};
				left: ${n};
				animation-duration: ${r}ms;
				background: ${s};
				color: ${h};
			}
		`), document.body.appendChild(this), this.addEventListener(
      "animationend",
      () => {
        this.remove();
      },
      { once: !0 }
    );
  }
  /**
   * Displays a toast notification on the screen.
   *
   * @param {string} text - A text content to display in the toast.
   * @param {Partial<AeroToastOptions>} options - Optional configuration for the toast appearance and behavior.
   * @returns {void}
   * @static
   *
   * @example
   * AeroToast.show('Hello World!');
   * AeroToast.show('Success!', { background: 'green', ms: 3000 });
   */
  static show(t, e = {}) {
    const i = {
      ...I,
      ...e
    };
    new l(t, i);
  }
}
customElements.define("aero-toast", l);
const H = `<style>\r
	:host {\r
		position: fixed;\r
		top: 0;\r
		left: 0;\r
		width: 100%;\r
		height: 100%;\r
	}\r
\r
	#overlay {\r
		position: relative;\r
		width: 100%;\r
		height: 100%;\r
	}\r
\r
	#container {\r
		position: absolute;\r
		top: 50%;\r
		left: 50%;\r
		transform: translate(-50%, -50%);\r
\r
		min-width: 300px;\r
		min-height: 200px;\r
\r
		display: grid;\r
		grid-template-rows: 1fr 4fr;\r
		grid-template-columns: 1fr;\r
	}\r
\r
	#head {\r
		display: grid;\r
		place-items: center;\r
		font-weight: bold;\r
	}\r
\r
	#body {\r
		display: grid;\r
		grid-template-rows: 1fr auto;\r
		grid-template-columns: 1fr;\r
\r
		place-items: center;\r
	}\r
\r
	#button-box {\r
		padding: 10px;\r
	}\r
\r
	button {\r
		min-width: 70px;\r
		min-height: 30px;\r
		border: none;\r
	}\r
\r
	button:hover {\r
		cursor: pointer;\r
		filter: brightness(0.9);\r
	}\r
\r
	button:active {\r
		scale: 0.99;\r
	}\r
</style>\r
\r
<div id="overlay">\r
	<div id="container">\r
		<div id="head">\r
			<span id="title"></span>\r
		</div>\r
		<div id="body">\r
			<span id="message"></span>\r
			<div id="button-box">\r
				<button id="ok">ok</button>\r
			</div>\r
		</div>\r
	</div>\r
</div>\r
`, S = `<style>\r
	:host {\r
		position: fixed;\r
		top: 0;\r
		left: 0;\r
		width: 100%;\r
		height: 100%;\r
	}\r
\r
	#overlay {\r
		position: relative;\r
		width: 100%;\r
		height: 100%;\r
	}\r
\r
	#container {\r
		position: absolute;\r
		top: 50%;\r
		left: 50%;\r
		transform: translate(-50%, -50%);\r
\r
		min-width: 300px;\r
		min-height: 200px;\r
\r
		display: grid;\r
		grid-template-rows: 1fr 4fr;\r
		grid-template-columns: 1fr;\r
	}\r
\r
	#head {\r
\r
	}\r
\r
	#body {\r
		display: grid;\r
		grid-template-rows: 1fr auto;\r
		grid-template-columns: 1fr;\r
\r
		place-items: center;\r
	}\r
\r
	#button-box {\r
		display: flex;\r
		gap: 10px;\r
		padding: 10px;\r
	}\r
\r
	button {\r
		min-width: 70px;\r
		min-height: 30px;\r
		border: none;\r
	}\r
\r
	button:hover {\r
		cursor: pointer;\r
		filter: brightness(0.9);\r
	}\r
\r
	button:active {\r
		scale: 0.99;\r
	}\r
</style>\r
\r
<div id="overlay">\r
	<div id="container">\r
		<div id="head"></div>\r
		<div id="body">\r
			<span id="message"></span>\r
			<div id="button-box">\r
				<button id="ok">ok</button>\r
				<button id="cancel">cancel</button>\r
			</div>\r
		</div>\r
	</div>\r
</div>\r
`, M = {
  blue_5: "#2563eb"
}, L = {
  fontSize: "1rem",
  containerBorder: "1px solid lightgrey",
  containerBoxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  primaryBackgroundColor: `${M.blue_5}`,
  primaryColor: "white",
  secondaryBackgroundColor: "grey",
  secondaryColor: "white",
  buttonBorderRadius: "0"
};
class c extends a {
  _$message;
  _$ok;
  _$cancel;
  _resolve;
  _handleKeyDown;
  constructor(t, e, i) {
    super(t);
    const {
      fontSize: n,
      containerBorder: r,
      containerBoxShadow: s,
      primaryBackgroundColor: h,
      primaryColor: _,
      secondaryBackgroundColor: g,
      secondaryColor: m,
      buttonBorderRadius: b
    } = i;
    this._$message = this.query("#message"), this._$message.textContent = e, this._$ok = this.query("#ok"), this._$cancel = this.queryOptional("#cancel"), this.applyStyles(`
			#container {
				font-size: ${n};
				border: ${r};
				box-shadow: ${s};
			}

			#head {
				background: ${h};
			}

			button {
				font-size: ${n};
				border-radius: ${b}
			}

			#ok {
				background-color: ${h};
				color: ${_};
			}

			#cancel {
				background-color: ${g};
				color: ${m};
			}
		`), this._$ok.onclick = () => {
      this.remove(), this._resolve?.(!0), this._resolve = void 0;
    }, this._$cancel && (this._$cancel.onclick = () => {
      this.remove(), this._resolve?.(!1), this._resolve = void 0;
    }), this._handleKeyDown = (u) => {
      u.key === "Enter" ? this._$ok.click() : u.key === "Escape" && (this._$cancel ? this._$cancel.click() : this._$ok.click());
    }, window.addEventListener("keydown", this._handleKeyDown), document.body.appendChild(this);
  }
  /**
   * Displays a alert notification on the screen.
   *
   * @param {string} message - A message content to display in the alert.
   * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
   * @returns {Promise<void>}
   * @static
   *
   * @example
   * AeroPopup.alert('Hello World!');
   */
  static alert(t, e = {}) {
    return this._create(H, t, e);
  }
  /**
   * Displays a confirm notification on the screen.
   *
   * @param {string} message - A message content to display in the confirm.
   * @param {Partial<AeroPopupOptions>} options - Configuration for appearance and behavior.
   * @returns {Promise<void>}
   * @static
   *
   * @example
   * AeroPopup.confirm('Hello World?');
   */
  static confirm(t, e = {}) {
    return this._create(S, t, e);
  }
  static _create(t, e, i) {
    const n = {
      ...L,
      ...i
    };
    return new Promise((r) => {
      const s = new c(t, e, n);
      s._resolve = r;
    });
  }
}
customElements.define("aero-popup", c);
const D = `<style>\r
\r
</style>\r
\r
<div id="list"></div>\r
<div class="highlight"></div>\r
`;
class R extends a {
  _items = [];
  _$list;
  _itemHeight = 0;
  _visibleCount = 5;
  _maxHeight = 0;
  _index = 0;
  _y = 0;
  _startY = 0;
  _isDown = !1;
  //
  _onPointerDown = (t) => {
    this._isDown = !0, this._startY = t.pageY, this._$list.style.transition = "none", window.addEventListener("pointermove", this._onPointerMove), window.addEventListener("pointerup", this._onPointerUp);
  };
  _onPointerMove = (t) => {
    if (!this._isDown) return;
    const e = t.pageY - this._startY;
    this._startY = t.pageY;
    const i = this._y + e, n = Math.max(this._maxHeight, Math.min(0, i));
    this._move(n);
  };
  _onPointerUp = () => {
    this._isDown && (this._isDown = !1, window.removeEventListener("pointermove", this._onPointerMove), window.removeEventListener("pointerup", this._onPointerUp), this._end());
  };
  //
  _wheelTimer;
  _onWheel = (t) => {
    t.preventDefault();
    const e = this._y - t.deltaY, i = Math.max(this._maxHeight, Math.min(0, e));
    this._move(i), clearTimeout(this._wheelTimer), this._wheelTimer = window.setTimeout(() => {
      this._end();
    }, 100);
  };
  constructor() {
    super(D), this._$list = this.query("#list"), this._itemHeight = parseInt(this.getAttribute("item-height") ?? "30"), this._visibleCount = parseInt(this.getAttribute("visible-count") ?? "5"), this._syncStyles();
  }
  connectedCallback() {
    this.addEventListener("pointerdown", this._onPointerDown), this.addEventListener("wheel", this._onWheel, { passive: !1 });
  }
  disconnectedCallback() {
    this.removeEventListener("pointerdown", this._onPointerDown), this.removeEventListener("wheel", this._onWheel);
  }
  //
  static get observedAttributes() {
    return ["item-height", "visible-count"];
  }
  attributeChangedCallback(t, e, i) {
    this._aeroRollerAttributeHandlers[t]?.(i);
  }
  _aeroRollerAttributeHandlers = {
    "item-height": (t) => {
      this._updateItemHeight(parseInt(t ?? "30"));
    },
    "visible-count": (t) => {
      this._updateVisibleCount(parseInt(t ?? "5"));
    }
  };
  /**
   * Sets the list of items for the roller.
   * @param {T[]} items - The array of items to display.
   */
  setItems(t) {
    this._items = t, this._updateMaxHeight(), this._render(), this._reset();
  }
  _updateItemHeight(t) {
    this._itemHeight = t, this._updateMaxHeight(), this._syncStyles(), this.scrollToIndex(this._index);
  }
  _updateVisibleCount(t) {
    t < 0 && (this._visibleCount = 0), this._visibleCount = t % 2 === 0 ? t + 1 : t, this._syncStyles(), this._render(), this.scrollToIndex(this._index);
  }
  _updateMaxHeight() {
    const t = Math.max(0, this._items.length - 1);
    this._maxHeight = -t * this._itemHeight;
  }
  _syncStyles() {
    this.applyStyles(`
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			:host {
				position: relative;
				display: block;
				height: ${this._itemHeight * this._visibleCount}px;
				overflow: hidden;
			}

			#list {
      }

			.item {
        height: ${this._itemHeight}px;

				text-align: center;
				line-height: ${this._itemHeight}px;

				user-select: none;
				cursor: var(--aero-roller-item-cursor);
      }

			.highlight {
				position: absolute;
				top: 50%;
				left: 0;

				width: 100%;
				height: ${this._itemHeight}px;
				transform: translateY(-50%);

				pointer-events: none;

				border-top: var(--aero-roller-highlight-border-top, var(--aero-roller-highlight-border, none));
				border-bottom: var(--aero-roller-highlight-border-bottom, var(--aero-roller-highlight-border, none));
				border-left: var(--aero-roller-highlight-border-left, var(--aero-roller-highlight-border, none));
				border-right: var(--aero-roller-highlight-border-right, var(--aero-roller-highlight-border, none));

				background: var(--aero-roller-highlight-bg, none);
			}
		`);
  }
  _render() {
    const t = Math.floor(this._visibleCount / 2), e = Array(t).fill('<div class="item"></div>').join("");
    this._$list.innerHTML = e + this._items.map((i) => `<div class="item">${i}</div>`).join("") + e;
  }
  _reset() {
    this._index = 0, this._move(0, !0);
  }
  //
  /**
   * The zero-based index of the currently selected item.
   * @type {number}
   * @readonly
   * @default 0
   */
  get index() {
    return this._index;
  }
  /**
   * Scrolls to the given item index.
   * @param {number} index - The index to scroll to.
   */
  scrollToIndex(t) {
    const e = Math.max(0, this._items.length - 1), i = Math.max(0, Math.min(t, e));
    this._index = i;
    const n = -(i * this._itemHeight);
    this._$list.style.transition = "transform 0.2s ease-out", this._move(n, !0), setTimeout(() => {
      this._$list.style.transition = "none";
    }, 200);
  }
  /**
   * The currently selected item value.
   * @type {T}
   * @readonly
   * @default undefined
   */
  get current() {
    return this._items[this._index];
  }
  //
  _move(t, e = !1) {
    this._y = t, e ? this._$list.style.transition = "none" : this._$list.style.transition = "transform 0.2s ease-out", this._$list.style.transform = `translateY(${this._y}px)`;
  }
  _end() {
    const t = Math.round(Math.abs(this._y / this._itemHeight));
    this.scrollToIndex(t), this.dispatchEvent(
      new CustomEvent("change", {
        detail: { index: t, value: this._items[t] }
      })
    );
  }
}
customElements.define("aero-roller", R);
export {
  $ as AeroIndeterminateSpinner,
  x as AeroNumericInput,
  E as AeroOption,
  c as AeroPopup,
  d as AeroResizableBox,
  R as AeroRoller,
  A as AeroSelect,
  w as AeroSpinbox,
  l as AeroToast
};
