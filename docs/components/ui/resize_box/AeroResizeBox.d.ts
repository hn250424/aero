import { default as BaseAeroResizeBox } from '../../base/BaseAeroResizeBox';
export default class AeroResizeBox extends BaseAeroResizeBox {
    constructor(resizeDirections?: {
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    });
}
