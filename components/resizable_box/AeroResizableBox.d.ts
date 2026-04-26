import { AeroShadowElement } from '../../core/AeroShadowElement';
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
export declare class AeroResizableBox extends AeroShadowElement<AeroResizableBoxEvents> {
    private _$topResizer;
    private _$bottomResizer;
    private _$leftResizer;
    private _$rightResizer;
    private _nMinWidth;
    private _nMaxWidth;
    private _nMinHeight;
    private _nMaxHeight;
    private _isTopDragging;
    private _isBottomDragging;
    private _isLeftDragging;
    private _isRightDragging;
    private _isDragging;
    private _animationFrameId;
    private _resizerHandlers;
    constructor();
    private _initializeAttributes;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleMousemove;
    private _handleMouseup;
    private _processMousedownEvent;
    private _emitResize;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private _baseAeroResizeBoxAttributeHandlers;
    private _updateResizeState;
    private _updateMinWidthValue;
    private _updateMaxWidthValue;
    private _updateMinHeightValue;
    private _updateMaxHeightValue;
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
