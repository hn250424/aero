import spinboxTemplateHtml from './spinbox.html?raw'
import BaseNumericInput from '../../base/BaseNumericInput'

export default class Spinbox extends BaseNumericInput {
    private minus: HTMLElement
    private plus: HTMLElement

    constructor() {
        super()
        
        const template = document.createElement('template')
        template.innerHTML = spinboxTemplateHtml

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.input = shadow.querySelector('.input')!
        this.input.addEventListener('focusout', () => this.validateValue())


        
        this.minus = this.shadowRoot!.querySelector('.minus')!
        this.plus = this.shadowRoot!.querySelector('.plus')!

        this.minus.addEventListener('click', this.decrement.bind(this))
        this.plus.addEventListener('click', this.increment.bind(this))
    }

    decrement() {
        let newValue = Number(this.input.value) - this.nStep
        newValue = Math.max(Number(this.nMin), parseFloat(newValue.toFixed(this.decimalPlaces)))
        this.updateValue(newValue)
    }

    increment() {
        let newValue = Number(this.input.value) + this.nStep
        newValue = Math.min(Number(this.nMax), parseFloat(newValue.toFixed(this.decimalPlaces)))
        this.updateValue(newValue)
    }

    updateValue(value: number) {
        const formattedValue = parseFloat(value.toFixed(this.decimalPlaces))
        this.input.value = formattedValue.toString()
    }
}

customElements.define('aero-spinbox', Spinbox)