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



        const buttonBackgroundColor = this.getAttribute('button-backgroundColor') || '#ccc'
        const textMinus = this.getAttribute('text-minus') || '-'
        const textPlus = this.getAttribute('text-plus') || '+'

        const computedStyle = getComputedStyle(this)
        const height = parseInt(computedStyle.height) || 30
        


        this.minus.textContent = textMinus
        this.plus.textContent = textPlus
        // this.applyStyles(
        //     `#spinbox {
        //         grid-template-columns: ${height}px 1fr ${height}px;
        //     }`
        // )
        this.applyStyles(
            `#spinbox {
                grid-template-columns: ${height}px 1fr ${height}px;
            }
            
            #spinbox > button { 
                background-color: ${buttonBackgroundColor};
            }`
        )

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

        const observer = new MutationObserver(() => {
            const bg = this.getAttribute('button-backgroundColor') || '#ccc'
            this.minus.style.backgroundColor = bg
            this.plus.style.backgroundColor = bg
        })

        observer.observe(this, { attributes: true })

        
    }

    protected getInputSelector(): string {
        return '#input'
    }



    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            'text-minus',
            'text-plus',
            'button-backgroundColor'
        ]
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, _oldValue, newValue)

        const handlers: Record<string, () => void> = {
            'text-minus': () => { this.minus.textContent = newValue },
            'text-plus': () => { this.plus.textContent = newValue },
            // 'button-backgroundColor': () => {
                // this.minus.style.backgroundColor = newValue!
                // this.plus.style.backgroundColor = newValue!
            //     this.applyStyles(
            //         `#spinbox > button { 
            //             background-color: ${newValue};
            //         }`
            //     )
            // }
        }

        handlers[name]?.()
    }

    setButtonBackgroundColor(color: string) {
        this.setAttribute('button-backgroundColor', color)
    }

    setMinusText(text: string) {
        this.setAttribute('text-minus', text)
    }

    setPlusText(text: string) {
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