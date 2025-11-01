import { default as BaseAeroProgress } from '../../base/BaseAeroProgress';
export default class AeroProgressSpinner extends BaseAeroProgress {
    protected spinner: HTMLElement;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private aeroProgressSpinnerAttributeHandlers;
    updateSpinnerBackground(val: string | null): void;
    updateSpinnerColor(val: string | null): void;
    set spinnerBackground(val: string);
    set spinnerColor(val: string);
}
