import { default as BaseAeroNumericInput } from '../../base/BaseAeroNumericInput';
export default class AeroSpinbox extends BaseAeroNumericInput {
    private minus;
    private plus;
    constructor();
    protected getInputSelector(): string;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private aeroSpinboxAttributeHandlers;
    private updateMinuxText;
    private updatePlusText;
    private updateButtonBackgrondColor;
    private updateHeight;
    set buttonBackgroundColor(color: string);
    set minusText(text: string);
    set plusText(text: string);
    decrement(): void;
    increment(): void;
}
