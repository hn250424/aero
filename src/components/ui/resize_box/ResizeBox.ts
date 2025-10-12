import BaseResizeBox from "../../base/BaseResizeBox"
import resizeBoxHtmlTemplate from './resize_box.html?raw'

export default class ResizeBox extends BaseResizeBox {
    constructor() {
        super(resizeBoxHtmlTemplate)
    }
}

customElements.define('aero-resize-box', ResizeBox)