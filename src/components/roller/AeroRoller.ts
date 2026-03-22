import { AeroShadowElement } from "../../core/AeroShadowElement";
import AeroRollerHtml from "./AeroRoller.html?raw";

/**
 * @module components
 */

/**
 * `<aero-roller>` is a custom roller element that provides a scrollable selection list.
 * It allows users to select an item by scrolling or dragging vertically.
 *
 * Important: This component relies on 'display: block' for internal coordinate calculations.
 * To manage height, use the 'visible-count' and 'item-height' attributes instead of setting the container height via CSS.
 *
 * @element aero-roller
 * @fires change - Fired when the selected option changes.
 *
 * @attr {number} [item-height=30] - Height of each item in pixels.
 * @attr {number} [visible-count=5] - Number of visible items in the roller.
 *
 * @cssprop [--aero-roller-item-cursor=auto] - Cursor style for roller items.
 * @cssprop [--aero-roller-highlight-border-top=none] - Top border style for the highlight element.
 * @cssprop [--aero-roller-highlight-border-bottom=none] - Bottom border style for the highlight element.
 * @cssprop [--aero-roller-highlight-border-left=none] - Left border style for the highlight element.
 * @cssprop [--aero-roller-highlight-border-right=none] - Right border style for the highlight element.
 * @cssprop [--aero-roller-highlight-border=none] - Fallback border style for the highlight element.
 * @cssprop [--aero-roller-highlight-bg=none] - Background color for the highlight element.
 *
 * @extends AeroShadowElement
 */
export class AeroRoller<T = string> extends AeroShadowElement {
	private _items: T[] = [];
	private _$list;
	private _itemHeight = 0;
	private _visibleCount = 5;
	private _maxHeight = 0;
	private _index = 0;

	private _y = 0;
	private _startY = 0;
	private _isDown = false;

	//

	private _onPointerDown = (e: PointerEvent) => {
		this._isDown = true;
		this._startY = e.pageY;
		this._$list.style.transition = "none";

		window.addEventListener("pointermove", this._onPointerMove);
		window.addEventListener("pointerup", this._onPointerUp);
	};

	private _onPointerMove = (e: PointerEvent) => {
		if (!this._isDown) return;

		const diff = e.pageY - this._startY;
		this._startY = e.pageY;
		const nextY = this._y + diff;
		const clampedY = Math.max(this._maxHeight, Math.min(0, nextY));

		this._move(clampedY);
	};

	private _onPointerUp = () => {
		if (!this._isDown) return;
		this._isDown = false;

		window.removeEventListener("pointermove", this._onPointerMove);
		window.removeEventListener("pointerup", this._onPointerUp);

		this._end();
	};

	//

	private _wheelTimer?: number;

	private _onWheel = (e: WheelEvent) => {
		e.preventDefault();

		const nextY = this._y - e.deltaY;
		const clampedY = Math.max(this._maxHeight, Math.min(0, nextY));

		this._move(clampedY);

		clearTimeout(this._wheelTimer);
		this._wheelTimer = window.setTimeout(() => {
			this._end();
		}, 100);
	};

	constructor() {
		super(AeroRollerHtml);

		this._$list = this.query("#list");

		this._itemHeight = parseInt(this.getAttribute("item-height") ?? "30");
		this._visibleCount = parseInt(this.getAttribute("visible-count") ?? "5");

		this._syncStyles();
	}

	connectedCallback() {
		this.addEventListener("pointerdown", this._onPointerDown);
		this.addEventListener("wheel", this._onWheel, { passive: false });
	}

	disconnectedCallback() {
		this.removeEventListener("pointerdown", this._onPointerDown);
		this.removeEventListener("wheel", this._onWheel);
	}

	//

	static get observedAttributes() {
		return ["item-height", "visible-count"];
	}

	attributeChangedCallback(
		name: string,
		_oldValue: string | null,
		newValue: string | null
	) {
		this._aeroRollerAttributeHandlers[name]?.(newValue);
	}

	private _aeroRollerAttributeHandlers: Record<
		string,
		(newValue: string | null) => void
	> = {
		"item-height": (newValue) => {
			this._updateItemHeight(parseInt(newValue ?? "30"));
		},
		"visible-count": (newValue) => {
			this._updateVisibleCount(parseInt(newValue ?? "5"));
		},
	};

	/**
	 * Sets the list of items for the roller.
	 * @param {T[]} items - The array of items to display.
	 */
	setItems(items: T[]) {
		this._items = items;

		this._updateMaxHeight();
		// this._syncStyles()
		this._render();

		this._reset();
	}

	private _updateItemHeight(height: number) {
		this._itemHeight = height;

		this._updateMaxHeight();
		this._syncStyles();
		// this._render()

		this.scrollToIndex(this._index);
	}

	private _updateVisibleCount(count: number) {
		if (count < 0) this._visibleCount = 0;
		this._visibleCount = count % 2 === 0 ? count + 1 : count;

		// this._updateMaxHeight()
		this._syncStyles();
		this._render();

		this.scrollToIndex(this._index);
	}

	private _updateMaxHeight() {
		const count = Math.max(0, this._items.length - 1);
		this._maxHeight = -count * this._itemHeight;
	}

	private _syncStyles() {
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

	private _render() {
		const paddingCount = Math.floor(this._visibleCount / 2);

		const padding = Array(paddingCount)
			.fill(`<div class="item"></div>`)
			.join("");

		this._$list.innerHTML =
			padding +
			this._items.map((item) => `<div class="item">${item}</div>`).join("") +
			padding;
	}

	private _reset() {
		this._index = 0;
		this._move(0, true);
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
	scrollToIndex(index: number) {
		const maxIdx = Math.max(0, this._items.length - 1);
		const safeIndex = Math.max(0, Math.min(index, maxIdx));
		this._index = safeIndex;

		const targetY = -(safeIndex * this._itemHeight);

		this._$list.style.transition = "transform 0.2s ease-out";
		this._move(targetY, true);

		setTimeout(() => {
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

	private _move(y: number, immediate = false) {
		this._y = y;

		if (immediate) {
			this._$list.style.transition = "none";
		} else {
			this._$list.style.transition = "transform 0.2s ease-out";
		}

		this._$list.style.transform = `translateY(${this._y}px)`;
	}

	private _end() {
		if (!this._isDown) return;
		this._isDown = false;

		const targetIndex = Math.round(Math.abs(this._y / this._itemHeight));
		this.scrollToIndex(targetIndex);

		this.dispatchEvent(
			new CustomEvent("change", {
				detail: { index: targetIndex, value: this._items[targetIndex] },
			})
		);
	}
}

customElements.define("aero-roller", AeroRoller);
