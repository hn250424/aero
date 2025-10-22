import BaseAeroResizeBox from "../../base/BaseAeroResizeBox"
import aeroResizeBoxHtmlTemplate from './AeroResizeBox.html?raw'

export default class AeroResizeBox extends BaseAeroResizeBox {
    constructor(resizeDirections?: { top?: boolean, bottom?: boolean, left?: boolean, right?: boolean }) {
        super(aeroResizeBoxHtmlTemplate, resizeDirections)
    }
}

customElements.define('aero-resize-box', AeroResizeBox)