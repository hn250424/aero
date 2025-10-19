import { default as BaseNumericInput } from '../../base/BaseNumericInput';
export default class Spinbox extends BaseNumericInput {
    private minus;
    private plus;
    constructor();
    protected getInputSelector(): string;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    setButtonBackgroundColor(color: string): void;
    setMinusText(text: string): void;
    setPlusText(text: string): void;
    decrement(): void;
    increment(): void;
}
