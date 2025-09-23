import BaseNumericInput from '../../base/BaseNumericInput'
import numericInputHtml from './numeric_input.html?raw'

export default class NumericInput extends BaseNumericInput {
    
    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = numericInputHtml

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))

        this.input = shadow.querySelector('.input')!
        this.input.addEventListener('focusout', () => this.validateValue())
    }
}

customElements.define('aero-numeric-input', NumericInput)
