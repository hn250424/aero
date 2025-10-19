import { default as BaseResizeBox } from '../../base/BaseResizeBox';
export default class ResizeBox extends BaseResizeBox {
    constructor(resizeDirections?: {
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    });
}
