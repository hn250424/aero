import spinboxHtmlTemplate from './spinbox.html?raw'
import BaseNumericInput from '../../base/BaseNumericInput'

export default class Spinbox extends BaseNumericInput {
    private minus: HTMLElement
    private plus: HTMLElement

    constructor() {
        super(spinboxHtmlTemplate)

        this.minus = this.query('#minus')
        this.plus = this.query('#plus')

        this.minus.addEventListener('click', this.decrement.bind(this))
        this.plus.addEventListener('click', this.increment.bind(this))



        const fontSize = this.getAttribute('font-size') || '1rem'
        const fontColor = this.getAttribute('font-color') || 'black'
        const buttonBackgroundColor = this.getAttribute('button-backgroundColor') || '#ccc'
        const textMinus = this.getAttribute('text-minus') || '-'
        const textPlus = this.getAttribute('text-plus') || '+'

        const computedStyle = getComputedStyle(this)
        const height = parseInt(computedStyle.height) || 30
        


        this.minus.textContent = textMinus
        this.plus.textContent = textPlus
        this.applyStyles(
            `#spinbox {
                grid-template-columns: ${height}px 1fr ${height}px;
            }
            
            #spinbox > * {
                font-size: ${fontSize};
                color: ${fontColor};
            }

            #spinbox > button { 
                background-color: ${buttonBackgroundColor};
            
            }`
        )

        
    }

    protected getInputSelector(): string {
        return '#input'
    }



    decrement() {
        let newValue = Number(this.input.value) - this.step
        newValue = Math.max(Number(this.min), parseFloat(newValue.toFixed(this.decimalPlaces)))
        this.updateValue(newValue)
    }

    increment() {
        let newValue = Number(this.input.value) + this.step
        newValue = Math.min(Number(this.max), parseFloat(newValue.toFixed(this.decimalPlaces)))
        this.updateValue(newValue)
    }

    updateValue(value: number) {
        const formattedValue = parseFloat(value.toFixed(this.decimalPlaces))
        this.input.value = formattedValue.toString()
    }
}

customElements.define('aero-spinbox', Spinbox)