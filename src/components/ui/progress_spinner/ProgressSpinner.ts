import BaseProgressSpinner from '../../base/BaseProgressSpinner'
import progressSpinnerHtmlTemplate from './progress_spinner.html?raw'

export default class ProgressSpinner extends BaseProgressSpinner {
    
    constructor() {
        super(progressSpinnerHtmlTemplate)
    }
}

customElements.define('aero-progress-spinner', ProgressSpinner)