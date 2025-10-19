import BaseShadowComponent from "./BaseShadowComponent"

export default abstract class BaseNumericInput extends BaseShadowComponent {
    private _input!: HTMLInputElement
    private _min!: number
    private _max!: number
    private _step!: number
    private _decimalPlaces!: number

    constructor(htmlTemplate: string) {
        super(htmlTemplate)
        this.initializeInput()

        this._min = Number(this.getAttribute('min') ?? 0)
        this._max = Number(this.getAttribute('max') ?? 100)
        this._step = Number(this.getAttribute('step') ?? 1)
        this._decimalPlaces = this._step.toString().split('.')[1]?.length || 0
        
        const value = Number(this.getAttribute('value') ?? 0)
        this._input.value = value.toString()
    }

    protected abstract getInputSelector(): string

    private initializeInput() {
        this._input = this.query(this.getInputSelector())
        this._input.addEventListener('focusout', () => {
            const validatedValue = this.getValidateValue(Number(this._input.value))
            this._input.value = validatedValue
        })
    }


    
    protected getValidateValue(value: number): string {
        value = Math.min(this._max, Math.max(this._min, Math.round(value / this._step) * this._step))
        return value.toFixed(this._decimalPlaces)
    }



    static get observedAttributes() {
        return ['min', 'max', 'step']
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        const num = Number(newValue)

        const handlers: Record<string, () => void> = {
            min: () => { this._min = num },
            max: () => { this._max = num },
            step: () => {
                this._step = num
                this._decimalPlaces = this._step.toString().split('.')[1]?.length || 0
            }
        }

        handlers[name]?.()
    }



    get input() { return this._input }

    get value() { return Number(this._input.value) }
    set value(val: number) { this._input.value = val.toString() }

    get min() { return this._min }
    set min(val: number) { this.setAttribute('min', val.toString()) }

    get max() { return this._max }
    set max(val: number) { this.setAttribute('max', val.toString()) }

    get step() { return this._step }
    set step(val: number) { this.setAttribute('step', val.toString()) }

    get decimalPlaces() { return this._decimalPlaces }

    
}