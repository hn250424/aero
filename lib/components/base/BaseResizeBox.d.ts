import { default as BaseShadowComponent } from './BaseShadowComponent';
export default abstract class BaseResizeBox extends BaseShadowComponent {
    private _topResizer;
    private _bottomResizer;
    private _leftResizer;
    private _rightResizer;
    private top;
    private bottom;
    private left;
    private right;
    private _minWidth;
    private _maxWidth;
    private _minHeight;
    private _maxHeight;
    private isTopDragging;
    private isBottomDragging;
    private isLeftDragging;
    private isRightDragging;
    private isDragging;
    private animationFrameId;
    constructor(htmlTemplate: string, resizeDirections?: {
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    });
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    setResizerColor(color: string): void;
    get minWidth(): number;
    set minWidth(val: number);
    get maxWidth(): number;
    set maxWidth(val: number);
    get minHeight(): number;
    set minHeight(val: number);
    get maxHeight(): number;
    set maxHeight(val: number);
}
