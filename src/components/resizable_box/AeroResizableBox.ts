import { AeroShadowElement } from "../../core/AeroShadowElement";
import aeroResizableBoxHtmlTemplate from "./AeroResizableBox.html?raw";

/**
 * Events fired by the `<aero-resizable-box>` component.
 */
export interface AeroResizableBoxEvents {
	/** Fired when a resize operation begins. */
	"aero-resize-start": {
		/** Initial width of the box. */
		width: number;
		/** Initial height of the box. */
		height: number;
		/** The edge that is being dragged. */
		edge: "top" | "bottom" | "left" | "right";
	};
	/** Fired continuously during a resize operation. */
	"aero-resize": {
		/** Current width of the box, or null if only height is changing. */
		width: number | null;
		/** Current height of the box, or null if only width is changing. */
		height: number | null;
	};
	/** Fired when a resize operation ends. */
	"aero-resize-end": {
		/** Final width of the box. */
		width: number;
		/** Final height of the box. */
		height: number;
	};
}

/**
 * @module components
 */

/**
 * A container element that can be resized by dragging its edges.
 *
 * @extends AeroShadowElement
 *
 * @fires aero-resize-start - Fired when a resize operation begins.
 * @fires aero-resize - Fired continuously during a resize operation.
 * @fires aero-resize-end - Fired when a resize operation ends.
 *
 * @slot - The default slot for content to be placed inside the resizable box.
 *
 * @cssprop [--aero-resizable-box-resizer-color=grey] - The color of the resizer handles on hover.
 */
export class AeroResizableBox extends AeroShadowElement<AeroResizableBoxEvents> {
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

		this._$topResizer = this.query<HTMLElement>("#top");
		this._$bottomResizer = this.query<HTMLElement>("#bottom");
		this._$leftResizer = this.query<HTMLElement>("#left");
		this._$rightResizer = this.query<HTMLElement>("#right");

		this._updateMinWidthValue(this.getAttribute("min-width"));
		this._updateMaxWidthValue(this.getAttribute("max-width"));
		this._updateMinHeightValue(this.getAttribute("min-height"));
		this._updateMaxHeightValue(this.getAttribute("max-height"));

		this._initializeAttributes();
	}

	private _initializeAttributes() {
		AeroResizableBox.observedAttributes.forEach((attr) => {
			const value = this.getAttribute(attr);
			this._baseAeroResizeBoxAttributeHandlers[attr]?.(value);
		});
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

	private _handleMouseup = (_e: MouseEvent) => {
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
	};

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

	private _emitResize(width: number | null, height: number | null) {
		this.forwardCustomEvent("aero-resize", {
			detail: {
				width: width,
				height: height,
			},
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
			"resize-right",
		];
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this._baseAeroResizeBoxAttributeHandlers[name]?.(newValue);
	}

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
	};

	private _updateResizeState(
		direction: "top" | "bottom" | "left" | "right",
		enabled: boolean
	) {
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

	private _updateMinWidthValue(val: string | null) {
		this._nMinWidth = val ? Number(val) : 0;
	}

	private _updateMaxWidthValue(val: string | null) {
		this._nMaxWidth = val ? Number(val) : 2000;
	}

	private _updateMinHeightValue(val: string | null) {
		this._nMinHeight = val ? Number(val) : 0;
	}

	private _updateMaxHeightValue(val: string | null) {
		this._nMaxHeight = val ? Number(val) : 2000;
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

declare global {
	interface HTMLElementTagNameMap {
		"aero-resizable-box": AeroResizableBox;
	}
}

customElements.define("aero-resizable-box", AeroResizableBox);
