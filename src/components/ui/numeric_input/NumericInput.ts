import BaseNumericInput from '../../base/BaseNumericInput'
import numericInputHtmlTemplate from './numeric_input.html?raw'

export default class NumericInput extends BaseNumericInput {
    
    constructor() {
        super(numericInputHtmlTemplate)
    }

    protected getInputSelector(): string {
        return '#input'
    }
}

customElements.define('aero-numeric-input', NumericInput)
