import BaseResizeBox from "../../base/BaseResizeBox"
import resizeBoxHtmlTemplate from './resize_box.html?raw'

export default class ResizeBox extends BaseResizeBox {
    constructor(resizeDirections?: { top?: boolean, bottom?: boolean, left?: boolean, right?: boolean }) {
        super(resizeBoxHtmlTemplate, resizeDirections)
    }
}

customElements.define('aero-resize-box', ResizeBox)