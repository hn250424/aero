import { AeroShadowElement } from '../../core/AeroShadowElement';
/**
 * @module components
 */
/**
 * A circular indeterminate spinner component.
 *
 * @extends AeroShadowElement
 *
 * Invalid or non-positive numeric attribute values fall back to their defaults.
 *
 * @attr {number} [size=50] - The size of the spinner in pixels.
 * @attr {number} [thickness=4] - The thickness of the spinner in pixels.
 * @attr {string} [track-color=transparent] - The color of the spinner's track.
 * @attr {string} [arc-color=black] - The color of the spinner's arc.
 * @attr {number} [cycle=2] - The duration of one spin cycle in seconds. Accepts fractional values (e.g. 0.5).
 * @attr {number} [arc-ratio=90] - The maximum length of the spinner arc, expressed as a percentage of the total circumference (1-100).
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
    private _parsePositive;
    private _syncSvgAttributes;
    private _syncStyles;
}
