import { default as AeroShadowElement } from '../../core/AeroShadowElement';
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
export default class AeroResizeBox extends AeroShadowElement {
    private _topResizer;
    private _bottomResizer;
    private _leftResizer;
    private _rightResizer;
    private _hasTopResizer;
    private _hasBottomResizer;
    private _hasLeftResizer;
    private _hasRightResizer;
    private _nMinWidth;
    private _nMaxWidth;
    private _nMinHeight;
    private _nMaxHeight;
    private isTopDragging;
    private isBottomDragging;
    private isLeftDragging;
    private isRightDragging;
    private isDragging;
    private animationFrameId;
    private resizerHandlers;
    constructor();
    /**
     * Handles the mousedown event on a resizer element.
     * @param {MouseEvent} e - The mouse event.
     * @param {"top" | "bottom" | "left" | "right"} resizer - The resizer that was clicked.
     * @private
     */
    private processMousedownEvent;
    /**
     * Emits the 'aero-resize' custom event.
     * @param {number | null} width - The new width, or null if not changed.
     * @param {number | null} height - The new height, or null if not changed.
     * @private
     */
    private emitResize;
    /**
     * Specifies the observed attributes for the custom element.
     * @returns {string[]} An array of attribute names to observe.
     */
    static get observedAttributes(): string[];
    /**
     * Called when an observed attribute has been added, removed, or changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string | null} _oldValue - The old value of the attribute.
     * @param {string | null} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    /**
     * A map of attribute names to their respective handler functions.
     * @private
     */
    private baseAeroResizeBoxAttributeHandlers;
    /**
     * Enables or disables the top resizer.
     * @param {boolean} enabled - Whether the resizer should be enabled.
     * @private
     */
    private updateTopResizerState;
    /**
     * Enables or disables the bottom resizer.
     * @param {boolean} enabled - Whether the resizer should be enabled.
     * @private
     */
    private updateBottomResizerState;
    /**
     * Enables or disables the left resizer.
     * @param {boolean} enabled - Whether the resizer should be enabled.
     * @private
     */
    private updateLeftResizerState;
    /**
     * Enables or disables the right resizer.
     * @param {boolean} enabled - Whether the resizer should be enabled.
     * @private
     */
    private updateRightResizerState;
    /**
     * A helper function to add or remove the mousedown event listener for a resizer.
     * @param {HTMLElement} resizer - The resizer element.
     * @param {boolean} enabled - Whether the resizer is enabled.
     * @param {(e: MouseEvent) => void} handler - The event handler.
     * @private
     */
    private updateResizeState;
    /**
     * Updates the internal minimum width value.
     * @param {string | null} val - The new value.
     * @private
     */
    private updateMinWidthValue;
    /**
     * Updates the internal maximum width value.
     * @param {string | null} val - The new value.
     * @private
     */
    private updateMaxWidthValue;
    /**
     * Updates the internal minimum height value.
     * @param {string | null} val - The new value.
     * @private
     */
    private updateMinHeightValue;
    /**
     * Updates the internal maximum height value.
     * @param {string | null} val - The new value.
     * @private
     */
    private updateMaxHeightValue;
    /**
     * The color of the resizer handles on hover.
     * @param {string} color - The color value.
     * @type {string}
     * @attr
     * @default "#ccc"
     */
    set resizerColor(color: string);
    /**
     * The minimum width of the box.
     * @type {string}
     * @attr min-width
     * @default "0"
     */
    get minWidth(): string;
    set minWidth(val: string);
    /**
     * The maximum width of the box.
     * @type {string}
     * @attr max-width
     * @default "2000"
     */
    get maxWidth(): string;
    set maxWidth(val: string);
    /**
     * The minimum height of the box.
     * @type {string}
     * @attr min-height
     * @default "0"
     */
    get minHeight(): string;
    set minHeight(val: string);
    /**
     * The maximum height of the box.
     * @type {string}
     * @attr max-height
     * @default "2000"
     */
    get maxHeight(): string;
    set maxHeight(val: string);
    /**
     * Enables the top resizer.
     */
    addTopResizer(): void;
    /**
     * Disables the top resizer.
     */
    removeTopResizer(): void;
    /**
     * Enables the bottom resizer.
     */
    addBottomResizer(): void;
    /**
     * Disables the bottom resizer.
     */
    removeBottomResizer(): void;
    /**
     * Enables the left resizer.
     */
    addLeftResizer(): void;
    /**
     * Disables the left resizer.
     */
    removeLeftResizer(): void;
    /**
     * Enables the right resizer.
     */
    addRightResizer(): void;
    /**
     * Disables the right resizer.
     */
    removeRightResizer(): void;
}
