export default class BaseNumericInput extends HTMLElement {
    protected input!: HTMLInputElement
    protected nMin!: number
    protected nMax!: number
    protected nStep!: number
    protected decimalPlaces!: number

    constructor() {
        super()

        this.nMin = Number(this.getAttribute('min') ?? 0)
        this.nMax = Number(this.getAttribute('max') ?? 100)
        this.nStep = Number(this.getAttribute('step') ?? 1)

        this.decimalPlaces = this.nStep.toString().split('.')[1]?.length || 0
    }


    
    protected validateValue() {
        let value = Number(this.input.value)
        value = Math.min(this.nMax, Math.max(this.nMin, Math.round(value / this.nStep) * this.nStep))
        this.input.value = value.toFixed(this.decimalPlaces)
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