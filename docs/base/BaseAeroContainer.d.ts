import { default as AeroShadowElement } from '../core/AeroShadowElement';
export default class BaseAeroContainer extends AeroShadowElement {
    protected constructor(htmlTemplate: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private baseAeroContainerAttributeHandlers;
    updateBackground(val: string | null): void;
    set containerBackground(val: string);
}
