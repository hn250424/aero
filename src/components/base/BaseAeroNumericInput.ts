import BaseAeroShadowComponent from "./BaseAeroShadowComponent"

export default abstract class BaseAeroNumericInput extends BaseAeroShadowComponent {
    private _input!: HTMLInputElement

    private _min!: string
    private _max!: string
    private _step!: string
    
    private _decimalPlaces!: string

    protected constructor(htmlTemplate: string) {
        super(htmlTemplate)
        this.initializeInput()

        this.updateMinValue( this.getAttribute('min') )
        this.updateMaxValue( this.getAttribute('max') )
        this.updateStepValue( this.getAttribute('step') )
        
        const value = this.getAttribute('value') ?? '0'
        this._input.value = value
    }

    protected abstract getInputSelector(): string

    private initializeInput() {
        this._input = this.query(this.getInputSelector())
        this._input.addEventListener('focusout', () => {
            const validatedValue = this.getValidateValue(this._input.value)
            this._input.value = validatedValue
        })
    }


    
    protected getValidateValue(value: string): string {
        const newValue = Math.min(
            Number(this._max), Math.max(
                Number(this._min), 
                Math.round(Number(value) / Number(this._step)) * Number(this._step)
            )
        )
        return newValue.toFixed(Number(this._decimalPlaces))
    }



    static get observedAttributes() {
        return ['min', 'max', 'step']
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        this.attributeHandlers[name]?.(newValue)
    }

    attributeHandlers: Record<string, (newValue: string | null) => void> = {
        min: (newValue) => { this.updateMinValue(newValue) },
        max: (newValue) => { this.updateMaxValue(newValue) },
        step: (newValue) => { this.updateStepValue(newValue) },
    }

    private updateMinValue(val: string | null) {
        this._min = val ? val : '0'
    }

    private updateMaxValue(val: string | null) {
        this._max = val ? val : '100'
    }

    private updateStepValue(val: string | null) {
        this._step = val ? val : '1'
        this._decimalPlaces = this._step.toString().split('.')[1]?.length.toString() || '0'
    }



    get input() { return this._input }

    get value() { return this._input.value }
    set value(val: string) { this._input.value = val }

    get min() { return this._min }
    set min(val: string) { this.setAttribute('min', val) }

    get max() { return this._max }
    set max(val: string) { this.setAttribute('max', val) }

    get step() { return this._step }
    set step(val: string) { this.setAttribute('step', val) }

    protected get decimalPlaces() { return this._decimalPlaces }

    
}