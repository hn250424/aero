import { AeroShadowElement } from "../../core/AeroShadowElement";
import AeroRollerHtml from "./AeroRoller.html?raw";

/**
 * Events fired by the `<aero-roller>` component.
 * @template T - The type of the items in the roller.
 */
export interface AeroRollerEvents<T = any> {
	/** Fired when the selected option changes. */
	change: {
		/** The index of the selected item. */
		index: number;
		/** The value of the selected item. */
		value: T;
	};
}

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
 * @attr {number} [item-height=30] - Height of each item in pixels. Invalid or non-positive values fall back to the default.
 * @attr {number} [visible-count=5] - Number of visible items in the roller. Even values are bumped to the next odd number so the selected item stays centered; invalid values fall back to the default.
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
export class AeroRoller<T = string> extends AeroShadowElement<AeroRollerEvents<T>> {
	private _items: T[] = [];
	private _$list: HTMLElement;
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

		this._$list = this.query<HTMLElement>("#list");

		this._itemHeight = AeroRoller._parseItemHeight(
			this.getAttribute("item-height")
		);
		this._visibleCount = AeroRoller._parseVisibleCount(
			this.getAttribute("visible-count")
		);

		this._syncStyles();
	}

	// Parses the item-height attribute; invalid or non-positive values fall
	// back to 30 (a zero height would break index calculations).
	private static _parseItemHeight(raw: string | null): number {
		const n = parseInt(raw ?? "");
		return isNaN(n) || n <= 0 ? 30 : n;
	}

	// Parses the visible-count attribute; invalid or non-positive values fall
	// back to 5, and even counts are bumped to the next odd number so the
	// selected item can sit exactly in the middle.
	private static _parseVisibleCount(raw: string | null): number {
		const n = parseInt(raw ?? "");
		const safe = isNaN(n) || n < 1 ? 5 : n;
		return safe % 2 === 0 ? safe + 1 : safe;
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
			this._updateItemHeight(AeroRoller._parseItemHeight(newValue));
		},
		"visible-count": (newValue) => {
			this._updateVisibleCount(AeroRoller._parseVisibleCount(newValue));
		},
	};

	/**
	 * Sets the list of items for the roller.
	 * Items are rendered as plain text, so markup in a value is displayed
	 * literally rather than parsed as HTML.
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
		this._visibleCount = count;

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

		const appendItem = (text: string) => {
			const $item = document.createElement("div");
			$item.className = "item";
			// textContent (not innerHTML) so item values can never inject markup.
			$item.textContent = text;
			this._$list.appendChild($item);
		};

		this._$list.textContent = "";

		for (let i = 0; i < paddingCount; i++) appendItem("");
		this._items.forEach((item) => appendItem(String(item)));
		for (let i = 0; i < paddingCount; i++) appendItem("");
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
		const previousIndex = this._index;
		const targetIndex = Math.round(Math.abs(this._y / this._itemHeight));
		this.scrollToIndex(targetIndex);

		// scrollToIndex clamps, so read back the committed index and only
		// notify listeners when the selection actually changed.
		if (this._index === previousIndex) return;

		this.forwardCustomEvent("change", {
			detail: { index: this._index, value: this._items[this._index] },
		});
	}
}


