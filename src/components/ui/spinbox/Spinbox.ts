import spinboxHtmlTemplate from './spinbox.html?raw'
import BaseNumericInput from '../../base/BaseNumericInput'

export default class Spinbox extends BaseNumericInput {
    private minus: HTMLElement
    private plus: HTMLElement

    constructor() {
        super(spinboxHtmlTemplate)

        this.minus = this.shadowRoot!.querySelector('#minus')!
        this.plus = this.shadowRoot!.querySelector('#plus')!

        this.minus.addEventListener('click', this.decrement.bind(this))
        this.plus.addEventListener('click', this.increment.bind(this))
    }

    protected getInputSelector(): string {
        return '#input'
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