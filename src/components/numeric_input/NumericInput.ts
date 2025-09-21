import numericInputHtml from './numeric_input.html?raw'

export default class NumericInput extends HTMLElement {
    private input!: HTMLInputElement
    private nMin!: number
    private nMax!: number
    private nStep!: number
    private decimalPlaces!: number

    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = numericInputHtml

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.input = shadow.querySelector('input')!


        
        this.nMin = Number(this.getAttribute('min') ?? 0)
        this.nMax = Number(this.getAttribute('max') ?? 100)
        this.nStep = Number(this.getAttribute('step') ?? 1)
        this.decimalPlaces = this.nStep.toString().split('.')[1]?.length || 0

        this.addEventListener('focusout', () => this.validateValue())
    }

    private validateValue() {
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

customElements.define('aero-numeric-input', NumericInput)
