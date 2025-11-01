import { default as BaseAeroShadowComponent } from './BaseAeroShadowComponent';
export default class BaseAeroProgress extends BaseAeroShadowComponent {
    protected constructor(htmlTemplate: string);
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;
    private baseAeroProgressAttributeHandlers;
    updateContainerBackground(val: string | null): void;
    set containerBackground(val: string);
}
