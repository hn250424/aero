import aeroSpinboxHtmlTemplate from './AeroSpinbox.html?raw'
import BaseAeroNumericInput from '../../base/BaseAeroNumericInput'

export default class AeroSpinbox extends BaseAeroNumericInput {
    private minus: HTMLElement
    private plus: HTMLElement

    constructor() {
        super(aeroSpinboxHtmlTemplate)

        this.minus = this.query('#minus')
        this.plus = this.query('#plus')

        this.minus.addEventListener('click', this.decrement.bind(this))
        this.plus.addEventListener('click', this.increment.bind(this))


        this.updateButtonBackgrondColor( this.getAttribute('button-backgroundcolor') )
        this.updateMinuxText( this.getAttribute('text-minus') )
        this.updatePlusText( this.getAttribute('text-plus') )
        this.updateHeight( parseInt(getComputedStyle(this).height) )

        

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newHeight = entry.contentRect.height
                this.applyStyles(
                    `#spinbox {
                        grid-template-columns: ${newHeight}px 1fr ${newHeight}px;
                    }`
                )
            }
        })
        resizeObserver.observe(this)
    }

    protected getInputSelector(): string {
        return '#input'
    }



    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            'text-minus',
            'text-plus',
            'button-backgroundcolor'
        ]
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, _oldValue, newValue)
        this.aeroSpinboxAttributeHandlers[name]?.(newValue)
    }

    private aeroSpinboxAttributeHandlers: Record<string, (val: string | null) => void> = {
        'text-minus': (val) => { this.updateMinuxText(val) },
        'text-plus': (val) => { this.updatePlusText(val) },
        'button-backgroundcolor': (val) => { this.updateButtonBackgrondColor(val) }
    }

    private updateMinuxText(val: string | null) {
        this.minus.textContent = val ? val : '-'
    }

    private updatePlusText(val: string | null) {
        this.plus.textContent = val ? val : '+'
    }

    private updateButtonBackgrondColor(val: string | null) {
        this.applyStyles(
            `#spinbox > button { 
                background-color: ${val ? val : '#ccc'};
            }`
        )
    }

    private updateHeight(val: number | null) {
        val = val ? val : 30
        this.applyStyles(
            `#spinbox {
                grid-template-columns: ${val}px 1fr ${val}px;
            }`
        )
    }



    set buttonBackgroundColor(color: string) {
        this.setAttribute('button-backgroundcolor', color)
    }

    set minusText(text: string) {
        this.setAttribute('text-minus', text)
    }

    set plusText(text: string) {
        this.setAttribute('text-plus', text)
    }



    decrement() {
        const num = Number(this.input.value) - Number(this.step)
        this.input.value = this.getValidateValue(num.toString())
    }

    increment() {
        let num = Number(this.input.value) + Number(this.step)
        this.input.value = this.getValidateValue(num.toString())
    }
}

customElements.define('aero-spinbox', AeroSpinbox)