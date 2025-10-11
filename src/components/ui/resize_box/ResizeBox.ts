import BaseResizeBox from "../../base/BaseResizeBox"
import resizeBoxHtmlTemplate from './resize_box.html?raw'

export default class ResizeBox extends BaseResizeBox {
    constructor() {
        super(resizeBoxHtmlTemplate)
    }

    protected getResizerSelector(): string {
        return '#resizer'
    }
}

customElements.define('aero-resize-box', ResizeBox)