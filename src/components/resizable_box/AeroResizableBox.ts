import { AeroShadowElement } from "../../core/AeroShadowElement";
import aeroResizableBoxHtmlTemplate from "./AeroResizableBox.html?raw";

/**
 * @module components
 */

/**
 * A container element that can be resized by dragging its edges.
 *
 * @extends AeroShadowElement
 *
 * @fires aero-resize-start - Fired when a resize operation begins. The detail object contains `width`, `height`, and `edge`.
 * @fires aero-resize - Fired continuously during a resize operation. The detail object contains `width` and `height`.
 * @fires aero-resize-end - Fired when a resize operation ends. The detail object contains the final `width` and `height`.
 *
 * @slot - The default slot for content to be placed inside the resizable box.
 */
export class AeroResizableBox extends AeroShadowElement {
	private _$topResizer!: HTMLElement;
	private _$bottomResizer!: HTMLElement;
	private _$leftResizer!: HTMLElement;
	private _$rightResizer!: HTMLElement;

	private _nMinWidth!: number;
	private _nMaxWidth!: number;
	private _nMinHeight!: number;
	private _nMaxHeight!: number;

	private _isTopDragging: boolean = false;
	private _isBottomDragging: boolean = false;
	private _isLeftDragging: boolean = false;
	private _isRightDragging: boolean = false;
	private _isDragging: boolean = false;

	private _animationFrameId: number | null = null;

	private _resizerHandlers = {
		top: (e: MouseEvent) => this._processMousedownEvent(e, "top"),
		bottom: (e: MouseEvent) => this._processMousedownEvent(e, "bottom"),
		left: (e: MouseEvent) => this._processMousedownEvent(e, "left"),
		right: (e: MouseEvent) => this._processMousedownEvent(e, "right"),
	};

	constructor() {
		super(aeroResizableBoxHtmlTemplate);

		this._$topResizer = this.query("#top");
		this._$bottomResizer = this.query("#bottom");
		this._$leftResizer = this.query("#left");
		this._$rightResizer = this.query("#right");

		this._updateMinWidthValue(this.getAttribute("min-width"));
		this._updateMaxWidthValue(this.getAttribute("max-width"));
		this._updateMinHeightValue(this.getAttribute("min-height"));
		this._updateMaxHeightValue(this.getAttribute("max-height"));
	}

	connectedCallback() {
		this._updateResizeState("top", this.hasAttribute("resize-top"));
		this._updateResizeState("bottom", this.hasAttribute("resize-bottom"));
		this._updateResizeState("left", this.hasAttribute("resize-left"));
		this._updateResizeState("right", this.hasAttribute("resize-right"));

		window.addEventListener("mousemove", this._handleMousemove);
		window.addEventListener("mouseup", this._handleMouseup);
	}

	disconnectedCallback() {
		this._updateResizeState("top", false);
		this._updateResizeState("bottom", false);
		this._updateResizeState("left", false);
		this._updateResizeState("right", false);

		window.removeEventListener("mousemove", this._handleMousemove);
		window.removeEventListener("mouseup", this._handleMouseup);
	}

	/**
	 * Handles mouse move events to perform resizing.
	 * @param {MouseEvent} e - The mouse event.
	 * @private
	 */
	private _handleMousemove = (e: MouseEvent) => {
		if (!this._isDragging) return;
		if (this._animationFrameId) cancelAnimationFrame(this._animationFrameId);

		this._animationFrameId = requestAnimationFrame(() => {
			const rect = this.getBoundingClientRect();

			if (this._isTopDragging) {
				const offsetY = rect.bottom - e.clientY;
				const newHeight = Math.min(
					Math.max(offsetY, this._nMinHeight),
					this._nMaxHeight
				);
				this.style.height = `${newHeight}px`;
				this._emitResize(null, newHeight);
			} else if (this._isBottomDragging) {
				const offsetY = e.clientY - rect.top;
				const newHeight = Math.min(
					Math.max(offsetY, this._nMinHeight),
					this._nMaxHeight
				);
				this.style.height = `${newHeight}px`;
				this._emitResize(null, newHeight);
			} else if (this._isLeftDragging) {
				const offsetX = rect.right - e.clientX;
				const newWidth = Math.min(
					Math.max(offsetX, this._nMinWidth),
					this._nMaxWidth
				);
				this.style.width = `${newWidth}px`;
				this._emitResize(newWidth, null);
			} else if (this._isRightDragging) {
				const offsetX = e.clientX - rect.left;
				const newWidth = Math.min(
					Math.max(offsetX, this._nMinWidth),
					this._nMaxWidth
				);
				this.style.width = `${newWidth}px`;
				this._emitResize(newWidth, null);
			}
		});
	};

	/**
	 * Handles the mouseup event to finalize the resize operation.
	 * @param {MouseEvent} e - The mouse event.
	 * @private
	 */
	private _handleMouseup = (e: MouseEvent) => {
		if (!this._isDragging) return;
		this.forwardCustomEvent("aero-resize-end", {
			detail: {
				width: this.offsetWidth,
				height: this.offsetHeight,
			},
		});

		if (this._animationFrameId) {
			cancelAnimationFrame(this._animationFrameId);
			this._animationFrameId = null;
		}

		document.body.style.cursor = "";
		document.body.style.userSelect = "";

		this._isDragging = false;
		this._isTopDragging = false;
		this._isBottomDragging = false;
		this._isLeftDragging = false;
		this._isRightDragging = false;
	}

	/**
	 * Handles the mousedown event on a resizer element.
	 * @param {MouseEvent} e - The mouse event.
	 * @param {"top" | "bottom" | "left" | "right"} resizer - The resizer that was clicked.
	 * @private
	 */
	private _processMousedownEvent = (
		e: MouseEvent,
		resizer: "top" | "bottom" | "left" | "right"
	) => {
		e.preventDefault();
		document.body.style.userSelect = "none";
		this._isDragging = true;
		this.forwardCustomEvent("aero-resize-start", {
			detail: {
				width: this.offsetWidth,
				height: this.offsetHeight,
				edge: resizer,
			},
		});

		switch (resizer) {
			case "top":
				this._isTopDragging = true;
				document.body.style.cursor = "ns-resize";
				break;
			case "bottom":
				this._isBottomDragging = true;
				document.body.style.cursor = "ns-resize";
				break;
			case "left":
				this._isLeftDragging = true;
				document.body.style.cursor = "ew-resize";
				break;
			case "right":
				this._isRightDragging = true;
				document.body.style.cursor = "ew-resize";
				break;
		}
	};

	/**
	 * Emits the 'aero-resize' custom event.
	 * @param {number | null} width - The new width, or null if not changed.
	 * @param {number | null} height - The new height, or null if not changed.
	 * @private
	 */
	private _emitResize(width: number | null, height: number | null) {
		this.forwardCustomEvent("aero-resize", {
			detail: {
				width: width,
				height: height,
			},
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
			"resizer-color",
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
		this._baseAeroResizeBoxAttributeHandlers[name]?.(newValue);
	}

	/**
	 * A map of attribute names to their respective handler functions.
	 * @private
	 */
	private _baseAeroResizeBoxAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		"min-width": (newValue) => {
			this._updateMinWidthValue(newValue);
		},
		"max-width": (newValue) => {
			this._updateMaxWidthValue(newValue);
		},
		"min-height": (newValue) => {
			this._updateMinHeightValue(newValue);
		},
		"max-height": (newValue) => {
			this._updateMaxHeightValue(newValue);
		},
		"resize-top": (newValue) => {
			this._updateResizeState("top", newValue !== null);
		},
		"resize-bottom": (newValue) => {
			this._updateResizeState("bottom", newValue !== null);
		},
		"resize-left": (newValue) => {
			this._updateResizeState("left", newValue !== null);
		},
		"resize-right": (newValue) => {
			this._updateResizeState("right", newValue !== null);
		},
		"resizer-color": (newValue) => {
			const color = newValue ?? "#ccc";
			this.applyStyles(`.resizer:hover { background-color: ${color}; }`);
		},
	};

	/**
	 * Enables or disables a resizer.
	 * @param {"top" | "bottom" | "left" | "right"} direction - The resizer to update.
	 * @param {boolean} enabled - Whether to enable or disable the resizer.
	 * @private
	 */
	private _updateResizeState(direction: "top" | "bottom" | "left" | "right", enabled: boolean) {
		let resizer;
		let handler;

		switch (direction) {
			case "top":
				resizer = this._$topResizer;
				handler = this._resizerHandlers.top;
				break;
			case "bottom":
				resizer = this._$bottomResizer;
				handler = this._resizerHandlers.bottom;
				break;
			case "left":
				resizer = this._$leftResizer;
				handler = this._resizerHandlers.left;
				break;
			case "right":
				resizer = this._$rightResizer;
				handler = this._resizerHandlers.right;
				break;
		}

		resizer.hidden = !enabled;

		if (enabled) resizer.addEventListener("mousedown", handler);
		else resizer.removeEventListener("mousedown", handler);
	}

	/**
	 * Updates the internal minimum width value.
	 * @param {string | null} val - The new value.
	 * @private
	 */
	private _updateMinWidthValue(val: string | null) {
		this._nMinWidth = val ? Number(val) : 0;
	}

	/**
	 * Updates the internal maximum width value.
	 * @param {string | null} val - The new value.
	 * @private
	 */
	private _updateMaxWidthValue(val: string | null) {
		this._nMaxWidth = val ? Number(val) : 2000;
	}

	/**
	 * Updates the internal minimum height value.
	 * @param {string | null} val - The new value.
	 * @private
	 */
	private _updateMinHeightValue(val: string | null) {
		this._nMinHeight = val ? Number(val) : 0;
	}

	/**
	 * Updates the internal maximum height value.
	 * @param {string | null} val - The new value.
	 * @private
	 */
	private _updateMaxHeightValue(val: string | null) {
		this._nMaxHeight = val ? Number(val) : 2000;
	}

	/**
	 * The color of the resizer handles on hover.
	 * @param {string} color - The color value.
	 * @type {string}
	 * @attr
	 * @default "#ccc"
	 */
	set resizerColor(color: string) {
		this.setAttribute("resizer-color", color);
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
	set minWidth(val: string) {
		this.setAttribute("min-width", val);
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
	set maxWidth(val: string) {
		this.setAttribute("max-width", val);
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
	set minHeight(val: string) {
		this.setAttribute("min-height", val);
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
	set maxHeight(val: string) {
		this.setAttribute("max-height", val);
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

customElements.define("aero-resizable-box", AeroResizableBox);
