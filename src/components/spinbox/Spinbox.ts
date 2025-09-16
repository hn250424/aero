import spinboxTemplateHtml from './spinbox.html?raw'

export default class Spinbox extends HTMLElement {
    private input!: HTMLInputElement
    private minus!: HTMLButtonElement
    private plus!: HTMLButtonElement

    private decimalPlaces!: number

    // slider?: HTMLInputElement

    constructor() {
        super()

        const spinboxTemplate = document.createElement('template')
        spinboxTemplate.innerHTML = spinboxTemplateHtml

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(spinboxTemplate.content.cloneNode(true))

        this.input = shadow.querySelector('.input')!
        this.minus = shadow.querySelector('.minus')!
        this.plus = shadow.querySelector('.plus')!

        this.min = Number(this.getAttribute('min') ?? 0)
        this.max = Number(this.getAttribute('max') ?? 100)
        this.step = Number(this.getAttribute('step') ?? 1)
        this.input.value = String(this.getAttribute('value') ?? this.min)

        this.minus.addEventListener('click', () => this.changeValue(-1))
        this.plus.addEventListener('click', () => this.changeValue(1))
        this.input.addEventListener('focusout', () => this.validateValue())

        this.decimalPlaces = this.step.toString().split('.')[1]?.length || 0

        // const sliderId = this.getAttribute('slider-id')
        // if (sliderId) this.slider = document.getElementById(sliderId) as HTMLInputElement

        const btnColor = this.getAttribute('button-color')
        if (btnColor) {
            this.minus.style.backgroundColor = btnColor
            this.plus.style.backgroundColor = btnColor
        }
    }

    get min() { return Number(this.getAttribute('min')) }
    set min(val: number) { this.setAttribute('min', val.toString()) }

    get max() { return Number(this.getAttribute('max')) }
    set max(val: number) { this.setAttribute('max', val.toString()) }

    get step() { return Number(this.getAttribute('step')) }
    set step(val: number) { this.setAttribute('step', val.toString()) }

    changeValue(multiplier: number) {
        let value = Number(this.input.value) + this.step * multiplier
        value = Math.min(this.max, Math.max(this.min, value))
        this.input.value = value.toFixed(this.decimalPlaces)
        // if (this.slider) this.slider.value = this.input.value
    }

    validateValue() {
        let value = Number(this.input.value)
        value = Math.min(this.max, Math.max(this.min, Math.round(value / this.step) * this.step))
        this.input.value = value.toFixed(this.decimalPlaces)
        // if (this.slider) this.slider.value = this.input.value
    }
}

customElements.define('aero-spinbox', Spinbox)