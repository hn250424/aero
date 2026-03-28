import { AeroShadowElement } from '../../core/AeroShadowElement';
/**
 * @module components
 */
/**
 * A circular indeterminate spinner component.
 *
 * @extends AeroShadowElement
 *
 * @attr {number} size - The size of the spinner in pixels.
 * @attr {number} thickness - The thickness of the spinner in pixels.
 * @attr {string} track-color - The color of the spinner's track.
 * @attr {string} arc-color - The color of the spinner's arc.
 * @attr {number} cycle - The duration of one spin cycle in seconds.
 * @attr {number} arc-ratio - The maximum length of the spinner arc, expressed as a percentage of the total circumference (0-100).
 */
export declare class AeroIndeterminateSpinner extends AeroShadowElement {
    private _size;
    private _thickness;
    private _radius;
    private _circumference;
    private _trackColor;
    private _arcColor;
    private _cycle;
    private _arcRatio;
    private _$svg;
    private _$track;
    private _$arc;
    constructor();
    private _buildSvg;
    static get observedAttributes(): string[];
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    private _syncHostAttributes;
    private _syncSvgAttributes;
    private _syncStyles;
}
declare global {
    interface HTMLElementTagNameMap {
        "aero-indeterminate-spinner": AeroIndeterminateSpinner;
    }
}
