export default class AeroShadowElement extends HTMLElement {
    protected shadow: ShadowRoot;
    protected constructor(htmlTemplate: string);
    protected query<T extends HTMLElement>(selector: string): T;
    protected applyStyles(style: string): void;
}
