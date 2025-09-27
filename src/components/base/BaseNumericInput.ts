import BaseShadowComponent from "./BaseShadowComponent"

export default abstract class BaseNumericInput extends BaseShadowComponent {
    protected input!: HTMLInputElement
    protected nMin!: number
    protected nMax!: number
    protected nStep!: number
    protected decimalPlaces!: number

    constructor(htmlTemplate: string) {
        super(htmlTemplate)
        this.initializeInput()

        this.nMin = Number(this.getAttribute('min') ?? 0)
        this.nMax = Number(this.getAttribute('max') ?? 100)
        this.nStep = Number(this.getAttribute('step') ?? 1)

        this.decimalPlaces = this.nStep.toString().split('.')[1]?.length || 0
    }

    protected abstract getInputSelector(): string

    private initializeInput() {
        this.input = this.query(this.getInputSelector())
        this.input.addEventListener('focusout', () => {
            const validatedValue = this.getValidateValue(Number(this.input.value))
            this.insertValueToInputDom(validatedValue)
        })
    }


    
    protected getValidateValue(value: number): string {
        value = Math.min(this.nMax, Math.max(this.nMin, Math.round(value / this.nStep) * this.nStep))
        return value.toFixed(this.decimalPlaces)
    }

    public insertValueToInputDom(value: string) {
        this.input.value = value
    }



    get min() { 
        return this.nMin 
    }
    
    set min(val: number) { 
        this.setAttribute('min', val.toString())
        this.nMin = val
    }

    get max() { 
        return this.nMax
    }

    set max(val: number) { 
        this.setAttribute('max', val.toString()) 
        this.nMax = val
    }

    get step() { 
        return this.nStep
    }

    set step(val: number) { 
        this.setAttribute('step', val.toString()) 
        this.nStep = val
    }



    get inputElement() { 
        return this.input 
    }
}