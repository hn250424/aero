import { AeroShadowElement } from '../../core/AeroShadowElement';
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
export declare class AeroRoller<T = string> extends AeroShadowElement<AeroRollerEvents<T>> {
    private _items;
    private _$list;
    private _itemHeight;
    private _visibleCount;
    private _maxHeight;
    private _index;
    private _y;
    private _startY;
    private _isDown;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
    private _wheelTimer?;
    private _onWheel;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private _aeroRollerAttributeHandlers;
    /**
     * Sets the list of items for the roller.
     * @param {T[]} items - The array of items to display.
     */
    setItems(items: T[]): void;
    private _updateItemHeight;
    private _updateVisibleCount;
    private _updateMaxHeight;
    private _syncStyles;
    private _render;
    private _reset;
    /**
     * The zero-based index of the currently selected item.
     * @type {number}
     * @readonly
     * @default 0
     */
    get index(): number;
    /**
     * Scrolls to the given item index.
     * @param {number} index - The index to scroll to.
     */
    scrollToIndex(index: number): void;
    /**
     * The currently selected item value.
     * @type {T}
     * @readonly
     * @default undefined
     */
    get current(): T;
    private _move;
    private _end;
}
