import AeroShadowElement from '../../core/AeroShadowElement'
import aeroProgressSpinnerHtmlTemplate from './AeroProgressSpinner.html?raw'

export default class AeroProgressSpinner extends AeroShadowElement {
    
    constructor() {
        super(aeroProgressSpinnerHtmlTemplate)
        this.updateSpinnerStyles()
    }

    

    static get observedAttributes() {
        return [
            'width',
            'height',
            'background',
            'color',
            'cycle',
        ]
    }

    attributeChangedCallback(_name: string, _oldValue: string | null, _newValue: string | null) {
        this.updateSpinnerStyles()
    }


    /**
     * Using :host instead of an inner element means styles are applied to the custom element itself.
     * Re-appending styles multiple times can cause conflicts or unexpected behavior.
     */
    private updateSpinnerStyles() {
        const width = this.getAttribute('width') || '50'
        const height = this.getAttribute('height') || '50'
        const bg = this.getAttribute('background') || 'white'
        const color = this.getAttribute('color') || 'black'
        const cycle = this.getAttribute('cycle') || '1'

        this.applyStyles(`
            :host {
                width: ${width}px;
                height: ${height}px;
                border: 5px solid ${bg};
                border-top-color: ${color};
                border-radius: 50%;
                animation: spin ${cycle}s linear infinite;
                box-sizing: border-box;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `)
    }



    set width(val: string) {
        this.setAttribute('width', val)
    }

    set height(val: string) {
        this.setAttribute('height', val)
    }

    set background(val: string) {
        this.setAttribute('background', val)
    }

    set color(val: string) {
        this.setAttribute('color', val)
    }

    set cycle(val: string) {
        this.setAttribute('cycle', val)
    }
}

customElements.define('aero-progress-spinner', AeroProgressSpinner)