import BaseAeroProgress from '../../base/BaseAeroProgress'
import aeroProgressSpinnerHtmlTemplate from './AeroProgressSpinner.html?raw'

export default class AeroProgressSpinner extends BaseAeroProgress {
    protected spinner: HTMLElement
    
    constructor() {
        super(aeroProgressSpinnerHtmlTemplate)

        this.spinner = this.query('.spinner')

        this.updateSpinnerBackground( this.getAttribute('spinner-background') )
        this.updateSpinnerColor( this.getAttribute('spinner-color') )
        
    }

    

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            'spinner-background',
            'spinner-color',
        ]
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
        super.attributeChangedCallback(name, _oldValue, newValue)
        this.aeroProgressSpinnerAttributeHandlers[name]?.(newValue)
    }

    private aeroProgressSpinnerAttributeHandlers: Record<string, (newValue: string | null) => void> = {
        'spinner-background': (newValue) => { this.updateSpinnerBackground(newValue) },
        'spinner-color': (newValue) => { this.updateSpinnerColor(newValue) },
    }



    updateSpinnerBackground(val: string | null) {
        this.applyStyles(
            `.spinner {
                border: 5px solid ${val ? val : 'white'};
            }`
        )
    }

    updateSpinnerColor(val: string | null) {
        this.applyStyles(
            `.spinner {
                border-top: 5px solid ${val ? val : 'black'};
            }`
        )
    }



    set spinnerBackground(val: string) {
        this.setAttribute('spinner-background', val)
    }

    set spinnerColor(val: string) {
        this.setAttribute('spinner-color', val)
    }
}

customElements.define('aero-progress-spinner', AeroProgressSpinner)