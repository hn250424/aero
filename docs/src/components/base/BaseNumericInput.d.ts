import { default as BaseShadowComponent } from './BaseShadowComponent';
export default abstract class BaseNumericInput extends BaseShadowComponent {
    private _input;
    private _min;
    private _max;
    private _step;
    private _decimalPlaces;
    constructor(htmlTemplate: string);
    protected abstract getInputSelector(): string;
    private initializeInput;
    protected getValidateValue(value: number): string;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    get input(): HTMLInputElement;
    get value(): number;
    set value(val: number);
    get min(): number;
    set min(val: number);
    get max(): number;
    set max(val: number);
    get step(): number;
    set step(val: number);
    get decimalPlaces(): number;
}
