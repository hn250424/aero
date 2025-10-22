import BaseAeroProgressSpinner from '../../base/BaseAeroProgressSpinner'
import aeroProgressSpinnerHtmlTemplate from './AeroProgressSpinner.html?raw'

export default class AeroProgressSpinner extends BaseAeroProgressSpinner {
    
    constructor() {
        super(aeroProgressSpinnerHtmlTemplate)
    }
}

customElements.define('aero-progress-spinner', AeroProgressSpinner)