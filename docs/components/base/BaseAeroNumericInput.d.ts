import { default as BaseAeroShadowComponent } from './BaseAeroShadowComponent';
export default abstract class BaseAeroNumericInput extends BaseAeroShadowComponent {
    private _input;
    private _min;
    private _max;
    private _step;
    private _decimalPlaces;
    protected constructor(htmlTemplate: string);
    protected abstract getInputSelector(): string;
    private initializeInput;
    protected getValidateValue(value: string): string;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private attributeHandlers;
    private updateMinValue;
    private updateMaxValue;
    private updateStepValue;
    get input(): HTMLInputElement;
    get value(): string;
    set value(val: string);
    get min(): string;
    set min(val: string);
    get max(): string;
    set max(val: string);
    get step(): string;
    set step(val: string);
    protected get decimalPlaces(): string;
}
