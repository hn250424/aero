import { default as AeroShadowElement } from '../../core/AeroShadowElement';
/**
 * @module components
 */
/**
 * A circular progress spinner component.
 *
 * @extends AeroShadowElement
 *
 * @property {string} width - The width of the spinner in pixels.
 * @property {string} height - The height of the spinner in pixels.
 * @property {string} background - The color of the spinner's track.
 * @property {string} color - The color of the spinner's moving part.
 * @property {string} cycle - The duration of one spin cycle in seconds.
 */
export default class AeroProgressSpinner extends AeroShadowElement {
    constructor();
    /**
     * Specifies the observed attributes for the custom element.
     * @returns {string[]} An array of attribute names to observe.
     */
    static get observedAttributes(): string[];
    /**
     * Called when an observed attribute has been added, removed, or changed.
     */
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    /**
     * Updates the spinner's styles based on its current attributes.
     * Using :host instead of an inner element means styles are applied to the custom element itself.
     * Re-appending styles multiple times can cause conflicts or unexpected behavior.
     * @private
     */
    private updateSpinnerStyles;
    /**
     * The width of the spinner in pixels.
     * @param {string} val - The width value.
     * @attr
     * @default "50"
     */
    set width(val: string);
    /**
     * The height of the spinner in pixels.
     * @param {string} val - The height value.
     * @attr
     * @default "50"
     */
    set height(val: string);
    /**
     * The color of the spinner's track.
     * @param {string} val - The background color value.
     * @attr
     * @default "white"
     */
    set background(val: string);
    /**
     * The color of the spinner's moving part.
     * @param {string} val - The color value.
     * @attr
     * @default "black"
     */
    set color(val: string);
    /**
     * The duration of one spin cycle in seconds.
     * @param {string} val - The cycle duration.
     * @attr
     * @default "1"
     */
    set cycle(val: string);
}
