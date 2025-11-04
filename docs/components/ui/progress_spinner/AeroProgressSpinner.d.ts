import { default as BaseAeroShadowComponent } from '../../base/BaseAeroShadowComponent';
export default class AeroProgressSpinner extends BaseAeroShadowComponent {
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null): void;
    /**
     * Using :host instead of an inner element means styles are applied to the custom element itself.
     * Re-appending styles multiple times can cause conflicts or unexpected behavior.
     */
    private updateSpinnerStyles;
    set width(val: string);
    set height(val: string);
    set background(val: string);
    set color(val: string);
    set cycle(val: string);
}
