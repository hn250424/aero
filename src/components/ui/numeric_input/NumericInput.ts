import BaseNumericInput from '../../base/BaseNumericInput'
import numericInputHtmlTemplate from './numeric_input.html?raw'

export default class NumericInput extends BaseNumericInput {
    
    constructor() {
        super(numericInputHtmlTemplate)

        const fontSize = this.getAttribute('font-size') || '1rem'
        const fontColor = this.getAttribute('font-color') || 'black'

        this.applyStyles(
            `#input {
                font-size: ${fontSize};
                color: ${fontColor};
            }`
        )
    }

    protected getInputSelector(): string {
        return '#input'
    }
}

customElements.define('aero-numeric-input', NumericInput)
