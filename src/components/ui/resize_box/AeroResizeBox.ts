import BaseAeroResizeBox from "../../base/BaseAeroResizeBox"
import aeroResizeBoxHtmlTemplate from './AeroResizeBox.html?raw'

export default class AeroResizeBox extends BaseAeroResizeBox {
    constructor() {
        super(aeroResizeBoxHtmlTemplate)
    }
}

customElements.define('aero-resize-box', AeroResizeBox)